import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { teamInfo } from '@/lib/types'

export async function POST(request: NextRequest) {
  const teamInfo = await request.json() as teamInfo

  try {
    const responsePrismaCreateTeam = await prisma.team.create({
      data: {
        name: teamInfo.name,
        interviewer: teamInfo.interviewerName,
        context: teamInfo.context,
        plan: 0,
        members: {
          connect : {
            stripeID: teamInfo.creator
          }
        }
      }
    })
  
    return NextResponse.json({ "message": "success", "teamId": responsePrismaCreateTeam.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}