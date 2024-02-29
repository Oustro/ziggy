import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {

  const transcriptInfo = await request.json()

  try {

    const transcript = await prisma.transcript.create({
      data: {
        convo: transcriptInfo.conversation,
        conducted: new Date(),
        interviewee: transcriptInfo.interviewee,
        interviewId: transcriptInfo.interviewId,
        sentiment: 0,
        icon: transcriptInfo.icon
      }
    })

    return NextResponse.json({ "message": "success", transcriptId: transcript.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}