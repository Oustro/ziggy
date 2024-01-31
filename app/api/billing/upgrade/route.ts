import { NextResponse, NextRequest } from 'next/server'
import Stripe from "stripe"

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function POST(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const upgradeInfo = await request.json() as { teamId: string, location: string }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [{
        price: "price_1N9LQED1chxrMDsa3Qc5oM7I",
        quantity: 1
      }],
      customer: session.customerId as string,
      mode: 'subscription',
      success_url: upgradeInfo.location+"/dashboard?team="+upgradeInfo.teamId,
      cancel_url: upgradeInfo.location+"/dashboard?team="+upgradeInfo.teamId,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          teamId: upgradeInfo.teamId
        }
      }
    })
  
    return NextResponse.json({ "message": "success", sessionUrl: stripeSession.url }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}