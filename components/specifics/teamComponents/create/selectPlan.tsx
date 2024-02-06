"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"
import Badge from "@/components/generics/badge"

import { useRouter } from "next/navigation";

import { FaCheck } from "react-icons/fa";

export default function SelectPlan({ teamId } : { teamId: string }) {
  const router = useRouter()
  const plans = [
    {
      title: "Free Plan",
      price: "$0",
      border: "p-4",
      description: "The Free plan is made for teams who want to get try Ziggy without commitment.",
      features: [
        "1 interview template",
        "15 AI interviews / template",
        "1 team member",
      ],
      action: <Link href={`/dashboard?team=${teamId}`}><BlackButton>Continue with Free</BlackButton></Link>
    },
    {
      title: "Pro Plan",
      price: "$29",
      border: "p-4 rounded border border-slate-600",
      description: "The Ziggy Pro plan is perfect for small teams who want to get started with Ziggy.",
      features: [
        "25 interview templates",
        "100 AI interviews / template",
        "5 team members",
      ],
      action: <button className="w-full" onClick={() => handleSubmit(1)}><BlackButton>Continue with Pro</BlackButton></button>
    },
    {
      title: "Business Plan",
      price: "$39",
      border: "p-4",
      description: "The Ziggy Business plan is perfect for larger teams who care about their users.",
      features: [
        "50 interview templates",
        "200 AI interviews / template",
        "15 team members",
      ],
      action: <button className="w-full" onClick={() => handleSubmit(2)}><BlackButton>Continue with Business</BlackButton></button>
    },
  ]

  async function handleSubmit(plan: number) {
    const responseBillingUpgrade = await fetch('/api/billing/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        teamId: teamId,
        plan: plan,
        location: window.location.origin
      })
    })

    const data = await responseBillingUpgrade.json()
    return router.push(data.sessionUrl)
  } 

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Select a Plan</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Learn more and compare Ziggy's pricing plans and features <Link target="_blank" href="/info/pricing" className="underline">here.</Link></p>
      <div className="full flex justify-between mt-16 gap-4">
        {plans.map((plan, index) => (
          <div key={index} className={plan.border}>
            <div>
              <h2 className="text-2xl font-semibold w-full">{plan.title}</h2>
              <div className="inline-block mt-2">
                <Badge>{plan.price} / month</Badge>
              </div>
            </div>
            <p className="text-slate-600 text-sm mt-4">{plan.description}</p>
            <ul className="grid gap-3 mt-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm font-medium gap-3"><FaCheck />{feature}</li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              {plan.action}
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm mt-12 text-center font-medium">
        <Link href="mailto:sales@useziggy.com" className="inline-block">
          <HoverWords>
            Looking for enterprise? Contact us
          </HoverWords>
        </Link>
      </div>
    </main>
  )
}