"use server"

import Stripe from "stripe"

export async function Open(conversation: Array<{role: string, content: string}>, interviewee: string, interviewId: string, teamStripeId: string) {
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
  
  const responseConversationRecordTranscriptCreate = await fetch(process.env.MODE_URL+"/api/conversation/record/transcript/create", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversation: conversation,
      interviewee: interviewee,
      interviewId: interviewId,
    })
  })

  const data = await responseConversationRecordTranscriptCreate.json()

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

  await fetch(process.env.MODE_URL+"/api/conversation/record/transcript/update", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      transcriptId: data.transcriptId,
      conversation: conversation
    })
  })
  
  return {
    tid: data.transcriptId, 
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