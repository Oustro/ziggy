import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function PUT(request: NextRequest) {

  const transcriptInfo = await request.json()

  try {

    const transcript = await prisma.transcript.update({
      where: {
        id: transcriptInfo.transcriptId
      },
      data: {
        convo: transcriptInfo.conversation
      }
    })

    return NextResponse.json({ "message": "success", transcriptId: transcript.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}