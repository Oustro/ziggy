import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {

  const { name, email, type } = await request.json()

  try {
    if (type === "login") {
      if (!email) {
        return NextResponse.json({ "message": "missing data" }, { status: 400 })
      }
    }
    else if (type === "signup") {
      if (!name || !email) {
        return NextResponse.json({ "message": "missing data" }, { status: 400 })
      }
    }

    const validEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email || "",
          mode: 'insensitive'
        }
      }
    })

    if (validEmail) {
      return NextResponse.json({ "message": "Email Exists" }, { status: 403 })
    }

    const redis = new Redis({
      url: process.env.UPSTASH_URL || "",
      token: process.env.UPSTASH_TOKEN || "",
    })
    
    await redis.set(email, {
      name: name
    },
    {
      ex: 60 * 60 * 24,
      nx: true
    })

    return NextResponse.json({ "message": "success" }, { status: 200 })
  
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}