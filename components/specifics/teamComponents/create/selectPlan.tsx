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
        "1 included interview",
        "50 questions / interview",
        "1 team member",
      ],
      action: <Link href={`/dashboard?team=${teamId}`}><BlackButton>Continue with Free Plan</BlackButton></Link>
    },
    {
      title: "Ziggy Pro Plan",
      price: "$29",
      border: "p-4 rounded border border-slate-600",
      description: "The Ziggy Pro plan is perfect for small teams who want to get started with Ziggy.",
      features: [
        "50 included interviews",
        "500 questions / interview",
        "10 team member",
      ],
      action: <button className="w-full" onClick={handleSubmit}><BlackButton>Continue with Ziggy Pro Plan</BlackButton></button>
    },
  ]

  async function handleSubmit() {
    const responseBillingUpgrade = await fetch('/api/billing/upgrade', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        teamId: teamId,
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
      <div className="flex gap-12 mt-16">
        {plans.map((plan, index) => (
          <div key={index} className={plan.border}>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold ">{plan.title}</h2>
              <Badge>{plan.price} / month</Badge>
            </div>
            <p className="text-slate-600 text-sm mt-4">{plan.description}</p>
            <ul className="grid gap-3 mt-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center font-medium gap-3"><FaCheck />{feature}</li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              {plan.action}
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm mt-12 text-center font-medium">
        <Link href="mailto:sales@useziggy.com">
          <HoverWords>
            Looking for enterprise? Contact us
          </HoverWords>
        </Link>
      </div>
    </main>
  )
}