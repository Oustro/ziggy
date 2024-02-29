import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

import { Client } from "postmark"


export async function POST(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const { teamID, invitee } = await request.json() as { teamID: string, invitee: string }

  try {
    const inviteid = nanoid(36)

    const redis = new Redis({
      url: process.env.UPSTASH_URL || "",
      token: process.env.UPSTASH_TOKEN || "",
    })

    await redis.set(inviteid, {
      teamID: teamID
    },
    {
      ex: 60 * 60 * 24,
      nx: true
    })

    const postmarkClient = new Client(process.env.EMAIL_SERVER_PASSWORD as string)
    await postmarkClient.sendEmail({
      "From": process.env.EMAIL_FROM as string,
      "To": invitee,
      "Subject": "You've been invited to join a team",
      "TextBody": "Hi,\n\n You've been invited to join a team on Ziggy. Click the link below to accept the invitation.\n\n https://useziggy.com/invite/" + inviteid + "\n\nThanks,\nZiggy Team",
    })


    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}