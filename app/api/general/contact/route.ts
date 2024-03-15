import { NextResponse, NextRequest } from 'next/server'

import { Client } from "postmark"

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

  const identifier = "Contact API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const contactInfo = await request.json() as { name: string, email: string, reason: string, comments: string }

  try {

    const postmarkClient = new Client(process.env.EMAIL_SERVER_PASSWORD as string)
    await postmarkClient.sendEmail({
      "From": process.env.EMAIL_FROM as string,
      "To": "support@useziggy.com",
      "Subject": "Contact Us: " + contactInfo.reason,
      "TextBody": "Name: " + contactInfo.name + "\nEmail: " + contactInfo.email + "\nReason: " + contactInfo.reason+ "\nComments: " + contactInfo.comments
    })


    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}