import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function PUT(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const customizeInfo = await request.json()

  try {

    await prisma.team.update({
      where: {
        id: customizeInfo.id
      },
      data: {
        logo: customizeInfo.logo,
        color: customizeInfo.color,
        style: customizeInfo.style
      }
    })

    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}