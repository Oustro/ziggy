import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function GET(request: NextRequest) {
  const interviewid = request.nextUrl.searchParams.get('id');

  try {

    const transcripts = await prisma.transcript.findMany({
      where: {
        interviewId: interviewid || ""
      }
    })

    return NextResponse.json({ "message": "success", transcripts: transcripts }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}