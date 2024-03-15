import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export async function PUT(request: NextRequest) {

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  })

  const identifier = "Update Transcript Interview API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const transcriptInfo = await request.json()

  try {

    const transcript = await prisma.transcript.update({
      where: {
        id: transcriptInfo.transcriptId
      },
      data: {
        convo: transcriptInfo.conversation
      }
    })

    return NextResponse.json({ "message": "success", transcriptId: transcript.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}