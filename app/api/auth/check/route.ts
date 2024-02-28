import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {

  const { name, email } = await request.json()

  try {
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