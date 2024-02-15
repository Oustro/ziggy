import { NextResponse, NextRequest } from 'next/server'

import OpenAI from "openai"

export async function POST(request: NextRequest) {

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