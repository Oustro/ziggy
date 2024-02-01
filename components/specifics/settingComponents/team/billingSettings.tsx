import { teamSavedInfo } from "@/lib/types"

import Badge from "@/components/generics/badge"
import BlackButton from "@/components/generics/blackButton"

import { useRouter } from "next/navigation"
import Link from "next/link"

import { FaCheck } from "react-icons/fa";

export default function BillingSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function}) {
  const router = useRouter()

  const plans = [
    {
      title: "Free Plan",
      price: "$0",
      plan: 0,
      description: "The Free plan is made for teams who want to get try Ziggy without commitment.",
      features: [
        "1 included interview",
        "50 questions / interview",
        "1 team member",
      ],
      action: <Link href={`/dashboard?team=${team.id}`}><BlackButton>Continue with Free Plan</BlackButton></Link>
    },
    {
      title: "Ziggy Pro Plan",
      price: "$29",
      plan: 1,
      description: "The Ziggy Pro plan is perfect for small teams who want to get started with Ziggy.",
      features: [
        "50 included interviews",
        "500 questions / interview",
        "10 team member",
      ],
      action: <button className="w-full" onClick={handleUpgrade}><BlackButton>Continue with Ziggy Pro Plan</BlackButton></button>
    },
  ]

  async function handleUpgrade() {
    const responseBillingUpgrade = await fetch('/api/billing/upgrade', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        teamId: team.id,
        location: window.location.origin
      })
    })

    const data = await responseBillingUpgrade.json()
    return router.push(data.sessionUrl)
  } 

  return (
    <main>
      <div className="px-8">
        {plans.map((plan, index) => (
          <div key={index} className={team.plan === plan.plan ? "p-4 mb-8 rounded border border-slate-600" : "px-4 mb-8"}>
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
            {team.plan !== plan.plan && (
              <div className="mt-12 text-center">
                {plan.action}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}