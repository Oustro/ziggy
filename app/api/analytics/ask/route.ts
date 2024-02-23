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

    let answers = ""

    for (let i = 0; i < responses.matches.length; ++i) {
      answers += i + 1 + ". " + responses.matches[i]?.metadata?.answer + "\n"
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": "You are Ziggy and you are going to help answer questions about user feedback data collected using data provided. If you are unable to provide an answer, suggest that the user update their interview in settings."
        },
        {
          "role": "user",
          "content": "We've asked people this question:\n\n"+question+"\n\nand here are the answers from different interviews done for different people:\n\n"+answers+"\nSummarize what the interviewees are saying in a short paragraph"
        }
      ],
      model: "gpt-3.5-turbo",
    })

    return NextResponse.json({ "message": "success", answer: completion.choices[0].message.content, source: responses.matches }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}