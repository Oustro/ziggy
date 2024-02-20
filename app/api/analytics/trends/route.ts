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

    let answers: string[] = []

    for (let i = 0; i < responses.matches.length; i++) {
      answers.push(responses.matches[i]?.metadata?.answer as string)
    }

    const sentData = new FormData()
    sentData.append("data", answers.join(','))

    const trendResponse = await fetch(process.env.TRENDS_URL as string, {
      method: "POST",
      body: sentData
    })

    const data = await trendResponse.json()

    return NextResponse.json({ "message": "success", analysis: data.analysis }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}