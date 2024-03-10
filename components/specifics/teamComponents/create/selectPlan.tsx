"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

import { useRouter } from "next/navigation"

import { FaCheck } from "react-icons/fa"

import { plans } from "@/lib/pricing"

export default function SelectPlan({ teamId } : { teamId: string }) {
  const router = useRouter()

  const planInfo = [
    {
      border: "border p-6 rounded",
      action: <Link href={`/dashboard?team=${teamId}`}><BlackButton>Continue with Free</BlackButton></Link>
    },
    {
      border: "border border-slate-600 p-6 rounded",
      action: <button className="w-full" onClick={() => handleSubmit(1)}><BlackButton>Continue with Pro</BlackButton></button>
    },
    {
      border: "border p-6 rounded",
      action: <button className="w-full" onClick={() => handleSubmit(2)}><BlackButton>Continue with Business</BlackButton></button>
    }
  ]

  async function handleSubmit(plan: number) {
    const responseBillingCreate = await fetch('/api/billing/create', {
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

    const data = await responseBillingCreate.json()
    return router.push(data.sessionUrl)
  } 

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Select a Plan</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Learn more and compare Ziggy's pricing plans and features <Link target="_blank" href="/info/pricing" className="underline">here.</Link></p>
      <div className="full flex justify-between mt-16 gap-4">
        {plans.map((plan, index) => (
          <div key={index} className={planInfo[index].border}>
            <div>
              <h2 className="text-2xl font-semibold w-full">{plan.title}</h2>
              <h1 className="text-3xl mt-4 font-medium">{plan.price} / month</h1>
            </div>
            <p className="text-slate-600 text-sm mt-4">{plan.description}</p>
            <ul className="grid gap-3 mt-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm font-medium gap-3"><FaCheck />{feature}</li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              {planInfo[index].action}
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