import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { interviewInfo } from '@/lib/types'
import { getPusherInstance } from '@/utils/pusher/server'
import { nanoid } from 'nanoid'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function POST(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const interviewInfo = await request.json() as interviewInfo

  try {
    const interview = await prisma.interview.create({
      data: {
        name: interviewInfo.name,
        purpose: interviewInfo.purpose,
        responses: 0,
        collect: interviewInfo.collect,
        teamId: interviewInfo.teamid,
        externalLink: nanoid(13)
      }
    })

    for (let i = 0; i < interviewInfo.questions.length; i++) {
      await prisma.guideQuestions.create({
        data: {
          question: interviewInfo.questions[i],
          interviewId: interview.id
        }
      })
    }

    await getPusherInstance().trigger(session.email as string,  "evt::created", {
      message: "interview-created"
    })

    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}