import { NextResponse, NextRequest } from 'next/server'
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  })

  const identifier = "Auth Check API"
  const { success } = await ratelimit.limit(identifier)
   
  if (!success) {
    return NextResponse.json({ "message": "Rate limit exceeded" }, { status: 429 })
  }

  const { name, email, type } = await request.json()

  try {
    if (type === "login") {
      if (!email) {
        return NextResponse.json({ "message": "missing data" }, { status: 500 })
      }

      const validEmail = await prisma.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive'
          }
        }
      })

      if (validEmail) {
        return NextResponse.json({ "message": "Account" }, { status: 200 })
      }

      return NextResponse.json({ "message": "No Account" }, { status: 403 })
    }
    else {
      if (!name || !email) {
        return NextResponse.json({ "message": "missing data" }, { status: 500 })
      }

      const validEmail = await prisma.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive'
          }
        }
      })

      if (validEmail) {
        return NextResponse.json({ "message": "Account" }, { status: 403 })
      }

      await redis.set(email, {
        name: name
      },
      {
        ex: 60 * 60 * 24,
        nx: true
      })

      const redisSet = await redis.get(email) as { name: string }

      if (!redisSet.name) {
        throw new Error("Error setting data in Redis.")
      }

      return NextResponse.json({ "message": "success" }, { status: 200 })
    }
  
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}