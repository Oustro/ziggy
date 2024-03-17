import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export async function POST(request: NextRequest) {

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  })

  const identifier = "Create Transcript Interview API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const transcriptInfo = await request.json()

  try {

    console.log(transcriptInfo.interviewee)

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

    console.log(transcript.id)

    return NextResponse.json({ "message": "success", transcriptId: transcript.id }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}