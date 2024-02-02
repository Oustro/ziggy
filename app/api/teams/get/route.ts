import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function GET(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  try {

    const teams = await prisma.userInfo.findUnique({
      where: {
        email: session.user?.email || ""
      },
      include: {
        teams: {
          include: {
            members: true,
          }
        }
      }
    })

    if (teams?.teams.length === 0) {
      return NextResponse.json({ "message": "success" }, { status: 207 })
    }
    else {
      teams?.teams.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    }
  
    return NextResponse.json({ "message": "success", teams: teams?.teams }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}