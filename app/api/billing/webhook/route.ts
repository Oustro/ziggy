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
      const subscriptionId = event.data.object.id
      const teamId = event.data.object.metadata.teamId
      const plan = event.data.object.metadata.plan
      
      await prisma.team.update({
        where: {
          id: teamId
        },
        data: {
          plan: parseInt(plan),
          stripeID: subscriptionId
        }
      })
    }

  return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}