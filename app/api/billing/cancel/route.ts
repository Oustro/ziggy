import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'
import Stripe from "stripe"

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function PUT(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })
  
  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const { teamId, subscription } = await request.json() as { teamId: string, subscription: string }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    await stripe.subscriptions.cancel(subscription)

    await prisma.team.update({
      where: {
        id: teamId
      },
      data: {
        plan: 0,
        stripeID: null
      }
    })
    
    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}