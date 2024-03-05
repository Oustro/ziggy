import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getPusherInstance } from '@/utils/pusher/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function DELETE(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  try {

    const { interviewID } = await request.json()

    await prisma.guideQuestions.deleteMany({
      where: {
        interviewId: interviewID
      }
    })

    await prisma.transcript.deleteMany({
      where: {
        interviewId: interviewID
      }
    })

    await prisma.interview.delete({
      where: {
        id: interviewID
      },
      include:{
        guide: true,
        transcript: true
      }
    })

    await getPusherInstance().trigger(session.email as string, "evt::created", {
      message: "interview-deleted"
    })
  
    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}