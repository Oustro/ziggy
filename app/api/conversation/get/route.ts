import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const externalid = request.nextUrl.searchParams.get('id');

  try {

    const interview = await prisma.interview.findUnique({
      where: {
        externalID: externalid || ""
      },
      include: {
        team: true,
        guide: true,
      }
    })

    if (!interview) {
      return NextResponse.json({ "message": "not found" }, { status: 404 })
    }

    return NextResponse.json({ "message": "success", interview: interview }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}