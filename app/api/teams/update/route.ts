import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { teamUpdateInfo } from '@/lib/types'
import { getPusherInstance } from '@/utils/pusher/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function PUT(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const teamInfo = await request.json() as teamUpdateInfo

  try {
    await prisma.team.update({
      where: {
        id: teamInfo.id
      },
      data: {
        name: teamInfo.name,
        interviewer: teamInfo.interviewerName,
        context: teamInfo.context
      }
    })

    await getPusherInstance().trigger(session.email as string,  "evt::created", {
      message: "interview-created"
    })

    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}