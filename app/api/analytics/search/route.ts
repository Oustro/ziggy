import { NextResponse, NextRequest } from 'next/server'
import OpenAI from 'openai'

import { Pinecone } from '@pinecone-database/pinecone'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }
  
  const interviewid = request.nextUrl.searchParams.get('id')
  const question = request.nextUrl.searchParams.get('q')

  try {

    const openai = new OpenAI()

    const emdedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: question || "",
    })

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
    })

    const index = pc.index("ziggy")

    const responses = await index.namespace(interviewid as string).query({
      topK: 20,
      vector: emdedding.data[0].embedding,
      includeMetadata: true
    })

    return NextResponse.json({ "message": "success", source: responses.matches }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}