import { NextResponse, NextRequest } from 'next/server'

import OpenAI from "openai"

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

  const identifier = "analytics API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const conversation = await request.json()

  try {
    const openai = new OpenAI()

    const completion = await openai.chat.completions.create({
      messages: conversation.conversation,
      model: "gpt-3.5-turbo",
    })

    return NextResponse.json({ "message": "success", question: completion.choices[0].message}, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}