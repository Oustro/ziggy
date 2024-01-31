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

    let status = 200
    if (!teams) {
      status = 207
    }
  
    return NextResponse.json({ "message": "success", teams: teams?.teams }, { status: status })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}