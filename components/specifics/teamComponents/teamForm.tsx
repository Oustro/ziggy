"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

export default function TeamForm() {

  const pricingPlans = [
    {
      symbol: 2,
      title: "2 week Pro team trial",
    },
    {
      symbol: 1,
      title: "Upgrade to Pro team",
    },
    {
      symbol: 0,
      title: "Continue with free team",
    },
  ]

  return (
    <main>
      <h1 className="text-5xl mt-4 font-semibold">Create a Team</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Teams are an important part of Ziggy. They provide context about your business or organzation to Ziggy for interviews. With more information, Ziggy is able to provide interviewees a better experience overall.</p>
      <form className="mt-8 grid gap-12 text-sm font-medium">
        <div>
          <label><span className="text-red-600">*</span> Team name</label>
          <p className="text-xs text-slate-600 mt-1">This is the name of your team.</p>
          <input
          type="text"
          className="p-2 w-96 mt-4 rounded border-b border-slate-300 text-base focus:outline-none"
          placeholder="Enter your team name..."
          maxLength={40}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Interviewer name</label>
          <p className="text-xs text-slate-600 mt-1">Customize the name the Al takes when conducting interviews.</p>
          <input
          type="text"
          className="p-2 w-96 mt-4 rounded border-b border-slate-300 text-base focus:outline-none"
          placeholder="Enter the interviewer's name..."
          maxLength={40}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Team context</label>
          <p className="text-xs text-slate-600 mt-1">Providing context about your team allows Ziggy to tailor interviews to suit your exact requirements and needs.</p>
          <textarea
          className="p-2 w-[50%] mt-4 rounded resize-y border-b border-slate-300 text-base focus:outline-none"
          placeholder="Enter context for this team..."
          maxLength={40}
          rows={4}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Choose team plan.</label>
          <Link target="_blank" href="/info/pricing"><p className="text-xs text-slate-600 mt-1 underline">Learn more about pricing plans and features here.</p></Link>
          {pricingPlans.map((plan) => (
            <div key={plan.symbol} className="flex items-center gap-4 mt-3">
              <input
              type="radio"
              className="w-4 h-4"
              name="pricingPlan"
              value={plan.symbol}
              required
              />
              <p className="text-slate-600">{plan.title}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-12 items-center">
          <button type="submit">
            <BlackButton>Create team</BlackButton>
          </button>
          <Link href="/dashboard">
              <HoverWords>Cancel</HoverWords>
          </Link>
        </div>
      </form>
    </main>
  )
}