import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export async function GET(request: NextRequest) {

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  })

  const identifier = "Retrieve Interview Info API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const externalid = request.nextUrl.searchParams.get('id');

  try {

    const interview = await prisma.interview.findUnique({
      where: {
        externalID: externalid || ""
      },
      include: {
        team: true,
        guide: true,
        transcript: true
      }
    })

    if (!interview) {
      return NextResponse.json({ "message": "not found" }, { status: 404 })
    }

    return NextResponse.json({ "message": "success", interview: interview }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}