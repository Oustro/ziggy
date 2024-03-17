"use server"

import Stripe from "stripe"
import prisma from '@/utils/db'
import OpenAI from "openai"


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

  await fetch(process.env.MODE_URL+"/api/conversation/record/analytics", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: question,
      answer: answer,
      answerSentiment: data.sentiment,
      mostSimilarQuestion: data.most_similar_question,
      interviewee: interviewee,
      interviewId: interviewId,
      transcriptId: transcriptId,
      conversation: conversation
    })
  })
}

export async function Converse(conversation: Array<{role: string, content: string}>, answer: string, interviewee: string, interviewId: string, transcriptId: string, questions: Array<any>) {
  const prevQuestion = conversation[conversation.length - 1]

  conversation.push({
    role: "user", 
    content: answer
  })

  const responseConversationRecord = await fetch(process.env.MODE_URL+"/api/conversation/record", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversation: conversation
    })
  })

  const updatedConvo = await responseConversationRecord.json()

  conversation.push(updatedConvo.question)

  Analytics(conversation, prevQuestion.content, answer, interviewee, interviewId, transcriptId, questions)
  
  return conversation
}