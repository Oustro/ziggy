import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }
  
  const interviewid = request.nextUrl.searchParams.get('id')

  try {

    const transcripts = await prisma.transcript.findMany({
      where: {
        interviewId: interviewid || ""
      }
    })

    if (transcripts.length === 0) {
      return NextResponse.json({ "message": "no interview" }, { status: 404 })
    }

    let dates: string[] = []
    let interiewConducted: number[] = []

    let interviewCount = 0

    dates.push(transcripts[0].conducted.toLocaleDateString("en-US"))

    for (let i = 0; i < transcripts.length; ++i) {
      if (dates.includes(transcripts[i].conducted.toLocaleDateString("en-US"))) {
        interviewCount++
      }
      else {
        dates.push(transcripts[i].conducted.toLocaleDateString("en-US"))
        interiewConducted.push(interviewCount)
        interviewCount = 1
      }
    }

    interiewConducted.push(interviewCount)

    if (!dates.includes(new Date().toLocaleDateString("en-US"))) {
      dates.push(new Date().toLocaleDateString("en-US"))
      interiewConducted.push(0)
    } 

    return NextResponse.json({ "message": "success", dates: dates, interviews: interiewConducted }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}