import { NextResponse, NextRequest } from 'next/server'
import { arrayEmbedding } from '@/lib/constants'

import { Pinecone } from '@pinecone-database/pinecone'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }
  
  const interviewid = request.nextUrl.searchParams.get('id')

  try {

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
    })

    const index = pc.index("ziggy")

    const responses = await index.namespace(interviewid as string).query({
      topK: 10000,
      vector: arrayEmbedding,
      includeMetadata: true
    })

    if (responses.matches.length === 0) {
      return NextResponse.json({ "message": "no data" }, { status: 404 })
    }

    let questions: string[] = []
    let sentiments: number[] = []
    let counts: number[] = []

    for (let i = 0; i < responses.matches.length; i++) {
      const question = responses.matches[i]?.metadata?.mostSimilarQuestion as string
      const sentiment = responses.matches[i]?.metadata?.sentiment as string

      if (questions.includes(question)) {
        const index = questions.indexOf(question)
        counts[index] = counts[index] + 1
        if (sentiment === "POSITIVE") {
          sentiments[index] = sentiments[index] + 1
        }
        else if (sentiment === "NEGATIVE") {
          sentiments[index] = sentiments[index] - 1
        }
      }
      else {
        questions.push(question)
        counts.push(1)
        if (sentiment === "POSITIVE") {
          sentiments.push(1)
        }
        else if (sentiment === "NEGATIVE") {
          sentiments.push(-1)
        }
        else {
          sentiments.push(0)
        }
      }
    }

    let bgColors = []
    let borderColors = []

    for (let i = 0; i < sentiments.length; ++i) {
      if (sentiments[i] > 0) {
        bgColors.push('#bbf7d0')
        borderColors.push('#22c55e')
      }
      else if (sentiments[i] < 0) {
        bgColors.push('#fecaca')
        borderColors.push('#f43f5e')
      }
      else {
        bgColors.push('#e2e8f0')
        borderColors.push('#475569')
      }
    }

    return NextResponse.json({ "message": "success", questions: questions, sentiments: {bgColor: bgColors, borderColor: borderColors}, counts: counts }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}