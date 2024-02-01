import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { Redis } from '@upstash/redis'
import * as crypto from "crypto"

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function PUT(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const { teamID, inviteID } = await request.json() as { teamID: string, inviteID: string }

  try {
    const randomBytes = crypto.randomBytes(8)
    const newID = Buffer.from(randomBytes).toString("hex")

    const redis = new Redis({
      url: process.env.UPSTASH_URL || "",
      token: process.env.UPSTASH_TOKEN || "",
    })

    await redis.set(newID, {
      teamID: teamID
    })

    await redis.del(inviteID)

    await prisma.team.update({
      where: {
        id: teamID
      },
      data: {
        inviteID: newID
      }
    })

    return NextResponse.json({ "message": "success", inviteID: newID }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}