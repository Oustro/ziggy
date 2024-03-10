import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

import { useRouter } from "next/navigation"

import { FaCheck } from "react-icons/fa"

import { plans } from "@/lib/pricing"

export default function BillingSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function}) {
  const router = useRouter()

  const planInfo = [
    {
      planNumber: 0, 
      action: <button className="w-full" onClick={handleCancel}><BlackButton>Switch to Free</BlackButton></button>
    },
    {
      planNumber: 1, 
      action: <button className="w-full" onClick={() => handleUpgrade(1)}><BlackButton>Switch to Pro</BlackButton></button>
    },
    {
      planNumber: 2, 
      action: <button className="w-full" onClick={() => handleUpgrade(2)}><BlackButton>Switch to Business</BlackButton></button>
    }
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
        method: "PUT",
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
    <main className="grid grid-cols-1 gap-8">
      {plans.map((plan, index) => (
        <div key={index} className={team.plan === planInfo[index].planNumber ? "border p-6 rounded border-slate-600" : "border p-6 rounded"}>
          <h2 className="text-2xl font-semibold">{plan.title}</h2>
          <h1 className="text-3xl mt-4 font-medium">{plan.price} / month</h1>
          <p className="text-slate-600 mt-4 pb-4 border-b">{plan.description}</p>
          <ul className="grid gap-3 mt-8 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center font-medium gap-3"><FaCheck />{feature}</li>
            ))}
          </ul>
          {team.plan !== planInfo[index].planNumber && (
            <div className="mt-12 text-center">
              {planInfo[index].action}
            </div>
          )}
        </div>
      ))}
    </main>
  )
}