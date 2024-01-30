"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import Badge from "@/components/generics/badge"
import WhiteButton from "@/components/generics/whiteButton"
import HoverWords from "@/components/generics/hoverWords"

export default function SelectPlan({ teamInfo, setTeamInfo, setView, customerId } : { teamInfo : { name: string, interviewerName: string, context: string }, setTeamInfo: Function, setView: Function, customerId: string }) {

  const plans = [
    {
      title: "Ziggy Pro Plan",
      price: "$29",
      description: "The Ziggy Pro plan is perfect for small teams who want to get started with Ziggy.",
      features: [
        "50 interviews",
        "200 questions / interview",
        "15 collaborators",
        "Access to all analytics",

      ],
    },
    {
      title: "Ziggy Enterprise Plan",
      price: "Custom",
      description: "The Ziggy Enterprise plan is perfect for large teams who want to get started with Ziggy.",
      features: [
        "Unlimited interviews",
        "Unlimited questions / interview",
      ],
    }
  ]
  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Select a Plan</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Learn more and compare Ziggy's pricing plans and features <Link target="_blank" href="/info/pricing" className="underline">here.</Link></p>
      {plans.map((plan, index) => (
        <div key={index} className="mt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold ">{plan.title}</h2>
            <Badge>{plan.price} / month</Badge>
          </div>
          <p className="text-slate-600 mt-1">{plan.description}</p>
          <div className="mt-4 ml-4">
            <ul className="grid gap-2 list-disc">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  )
}