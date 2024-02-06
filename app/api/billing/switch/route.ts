import { NextResponse, NextRequest } from 'next/server'
import Stripe from "stripe"
import prisma from '@/utils/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function POST(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const upgradeInfo = await request.json() as { teamId: string, subscription: string, plan: number, location: string }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    let priceId = "price_1OgrCgD1chxrMDsaRMCnwRZt"
    if (upgradeInfo.plan === 1) {
      priceId = "price_1OgrCgD1chxrMDsaRMCnwRZt"
    }
    else if (upgradeInfo.plan === 2) {
      priceId = "price_1OgrE0D1chxrMDsa31sq6CeO"
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(upgradeInfo.subscription)

    const siId = stripeSubscription.items.data[0].id

    await stripe.subscriptions.update(upgradeInfo.subscription, {
      items: [{
        id: siId,
        price: priceId
      }]
    })

    await prisma.team.update({
      where: {
        id: upgradeInfo.teamId
      },
      data: {
        plan: upgradeInfo.plan,
      }
    })
    
    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}

