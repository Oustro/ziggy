import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { teamInfo } from '@/lib/types'
import { Redis } from '@upstash/redis'
import { getPusherInstance } from '@/utils/pusher/server'
import { nanoid } from 'nanoid'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function POST(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const teamInfo = await request.json() as teamInfo

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  try {
    const responsePrismaCreateTeam = await prisma.team.create({
      data: {
        name: teamInfo.name,
        interviewer: teamInfo.interviewerName,
        context: teamInfo.context,
        plan: 0,
        members: {
          connect : {
            stripeID: session.customerId as string
          }
        }
      }
    })

    const id = nanoid(36)
    
    await redis.set(id, {
      teamID: responsePrismaCreateTeam.id
    })

    await prisma.team.update({
      where: {
        id: responsePrismaCreateTeam.id
      },
      data: {
        inviteID: id
      }
    })

    await getPusherInstance().trigger(session.email as string,  "evt::created", {
      message: "team-created"
    })
  
    return NextResponse.json({ "message": "success", "teamId": responsePrismaCreateTeam.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}