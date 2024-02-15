import { NextResponse, NextRequest } from 'next/server'

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import { Pinecone } from '@pinecone-database/pinecone'

import OpenAI from "openai"

import prisma from '@/utils/db'

import { nanoid } from 'nanoid'

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

  const conversationInfo = await request.json() as { conversation: Array<{role: string, content: string}>, question: string, answer: string, interviewee: string, interviewId: string, transcriptId: string, answerSentiment: Array<{label: string, score: number}>, mostSimilarQuestion: string }

  try {
    const openai = new OpenAI()

    const emdedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: conversationInfo.question,
    })
    
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
    })

    const index = pc.index("ziggy")

    const id = nanoid(36)

    await index.namespace(conversationInfo.interviewId).upsert([{
      id: id,
      values: emdedding.data[0].embedding,
      metadata: {
        question: conversationInfo.question,
        answer: conversationInfo.answer,
        interviewee: conversationInfo.interviewee,
        answerSentiment: conversationInfo.answerSentiment[0].label,
        mostSimilarQuestion: conversationInfo.mostSimilarQuestion
      }
    }])

    await prisma.transcript.update({
      where: {
        id: conversationInfo.transcriptId
      },
      data: {
        sentiment: {
          increment: conversationInfo.answerSentiment[0].label === "POSITIVE" ?  1 : -1
        },
        convo: conversationInfo.conversation
      }
    })

    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}