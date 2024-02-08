import { teamSavedInfo } from "@/lib/types"

import Badge from "@/components/generics/badge"
import BlackButton from "@/components/generics/blackButton"

import { useRouter } from "next/navigation"

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
        "3 interview template",
        "50 AI interviews / template",
        "1 team member",
      ],
      action: <button className="w-full" onClick={handleCancel}><BlackButton>Switch to Free</BlackButton></button>
    },
    {
      title: "Ziggy Pro Plan",
      price: "$24",
      plan: 1,
      description: "The Ziggy Pro plan is perfect for small teams who want to get started with Ziggy.",
      features: [
        "25 interview templates",
        "100 AI interviews / template",
        "5 team members",
      ],
      action: <button className="w-full" onClick={() => handleUpgrade(1)}><BlackButton>Switch to Pro</BlackButton></button>
    },
    {
      title: "Ziggy Business Plan",
      price: "$49",
      plan: 2,
      description: "The Ziggy Business plan is perfect for larger teams who care about their users.",
      features: [
        "50 interview templates",
        "200 AI interviews / template",
        "15 team members",
      ],
      action: <button className="w-full" onClick={() => handleUpgrade(2)}><BlackButton>Switch to Business</BlackButton></button>
    },
  ]

  async function handleUpgrade(plan: number) {
    if (team.plan === 0) {
      const responseBillingCreate = await fetch('/api/billing/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          teamId: team.id,
          plan: plan,
          location: window.location.origin
        })
      })
  
      const data = await responseBillingCreate.json()
      return router.push(data.sessionUrl)
    }
    else {
      await fetch('/api/billing/switch', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          teamId: team.id,
          subscription: team.stripeID,
          plan: plan,
          location: window.location.origin
        })
      })

      return setRefreshKey((prevKey: number) => prevKey + 1)
    }
  } 

  async function handleCancel() {
    await fetch('/api/billing/cancel', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        teamId: team.id,
        subscription: team.stripeID,
      })
    })

    return setRefreshKey((prevKey: number) => prevKey + 1)
  } 

  return (
    <main>
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
    </main>
  )
}