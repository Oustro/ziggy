import { NextResponse, NextRequest } from 'next/server'
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import prisma from '@/utils/db'

export async function GET(request: NextRequest) {

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  })

  const identifier = "Auth Check API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const interviewid = request.nextUrl.searchParams.get('id')

  try {

    console.log(interviewid)

    const interviewInfo = await prisma.interview.findUnique({
      where: {
        externalID: interviewid || ""
      },
      include: {
        team: true
      }
    })

    console.log(interviewInfo)

    return NextResponse.json({ "message": "success", color: interviewInfo?.team.color, interviewer: interviewInfo?.team.interviewer, logo: interviewInfo?.team.logo }, { status: 200 })
  
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}