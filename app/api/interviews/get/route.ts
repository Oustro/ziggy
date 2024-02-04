import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const teamid = request.nextUrl.searchParams.get('id');

  try {
    
    const team = await prisma.team.findUnique({
      where: {
        id: teamid || ""
      }
    })

    const interviews = await prisma.interview.findMany({
      where: {
        teamId: teamid || ""
      },
      include: {
        guide: true,
      }
    })

    console.log(interviews)

    if (interviews.length === 0) {
      return NextResponse.json({ "message": "success" }, { status: 207 })
    }
  
    return NextResponse.json({ "message": "success", team: team, interviews: interviews }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}