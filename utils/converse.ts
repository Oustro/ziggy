"use server"

import Stripe from "stripe"
import prisma from '@/utils/db'
import OpenAI from "openai"
import { Pinecone } from '@pinecone-database/pinecone'
import { nanoid } from 'nanoid'

export async function Open(conversation: Array<{role: string, content: string}>, interviewee: string, interviewId: string, teamStripeId: string, icon: string) {
  if (teamStripeId) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const stripeSubscription = await stripe.subscriptions.retrieve(teamStripeId)

    const siId = stripeSubscription.items.data[1].id

    await stripe.subscriptionItems.createUsageRecord(
      siId,
      {
        quantity: 1,
      }
    )
  }
  
  const transcript = await prisma.transcript.create({
    data: {
      convo: conversation,
      conducted: new Date(),
      interviewee: interviewee,
      interviewId: interviewId,
      sentiment: 0,
      icon: icon
    }
  })

  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: conversation as any,
    model: "gpt-3.5-turbo",
  })

  conversation.push(completion.choices[0].message as any)

  await prisma.transcript.update({
    where: {
      id: transcript.id
    },
    data: {
      convo: conversation
    }
  })
  
  return {
    tid: transcript.id, 
    updatedConvo: conversation
  }
}

async function Analytics(conversation: Array<{role: string, content: string}>, question: string, answer: string, interviewee: string, interviewId: string, transcriptId: string, questions: Array<any>) {
  let questionList = []
  for (let i = 0; i < questions.length; i++) {
    questionList.push(questions[i].question)
  }

  const responseAnalyticsUrl = await fetch(process.env.ANALYTICS_URL as string, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      questions: questionList,
      new_question: question,
      answer: answer,
    })
  })

  const data = await responseAnalyticsUrl.json()

  const openai = new OpenAI()

  const emdedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: question,
  })
  
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  })

  const index = pc.index("ziggy")

  const id = nanoid(36)

  await index.namespace(interviewId).upsert([{
    id: id,
    values: emdedding.data[0].embedding,
    metadata: {
      question: question,
      answer: answer,
      interviewee: interviewee,
      answerSentiment: data.sentiment[0].label,
      mostSimilarQuestion: data.most_similar_question,
      transcriptId: transcriptId
    }
  }])

  await prisma.transcript.update({
    where: {
      id: transcriptId
    },
    data: {
      sentiment: {
        increment: data.sentiment[0].label === "POSITIVE" ?  1 : -1
      },
      convo: conversation
    }
  })
}

export async function Converse(conversation: Array<{role: string, content: string}>, answer: string, interviewee: string, interviewId: string, transcriptId: string, questions: Array<any>) {
  const prevQuestion = conversation[conversation.length - 1]

  conversation.push({
    role: "user", 
    content: answer
  })

  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: conversation as any,
    model: "gpt-3.5-turbo",
  })

  conversation.push(completion.choices[0].message as any)

  Analytics(conversation, prevQuestion.content, answer, interviewee, interviewId, transcriptId, questions)
  
  return conversation
}