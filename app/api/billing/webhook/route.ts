import { NextResponse, NextRequest } from 'next/server'
import Stripe from "stripe"
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
  const sig = request.headers.get('stripe-signature') as string
  const payload = await request.text()
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)

    if (event.type === 'customer.subscription.created') {
      const teamId = event.data.object.metadata.teamId
      await prisma.team.update({
        where: {
          id: teamId
        },
        data: {
          plan: 1
        }
      })
    }
    else if (event.type === 'customer.subscription.deleted') {
      const teamId = event.data.object.metadata.teamId
      await prisma.team.update({
        where: {
          id: teamId
        },
        data: {
          plan: 0
        }
      })
    }
    else if (event.type === 'customer.subscription.paused') {
      const session = event.data.object
      console.log(session)
    }

  return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}