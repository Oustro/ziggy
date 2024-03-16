import { FaCheck } from "react-icons/fa"

import BlackButton from "@/components/generics/blackButton"

import Link from "next/link"

import { plans } from "@/lib/pricing"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Ziggy",
}

export default function Pricing() {

  const borders = [
    "border p-6 rounded",
    "border border-slate-600 p-6 rounded",
    "border p-6 rounded"
  ]

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Pricing Plans</h1>
      <p className="text-slate-600 mt-6 text-center w-[80%] mx-auto">An affordable, simple pricing model to help you get the most out of your feedback with Ziggy.</p>
      <div className="sm:w-[80%] mx-auto px-12 grid gap-8 sm:grid-cols-3 mt-12">
        {plans.map((plan, index) => (
          <div key={index} className={borders[index]}>
            <h2 className="text-2xl font-semibold">{plan.title}</h2>
            <h1 className="text-3xl mt-4 font-medium">{plan.price} / month</h1>
            <p className="text-slate-600 mt-4 pb-4 border-b">{plan.description}</p>
            <ul className="grid gap-3 mt-8 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center font-medium gap-3"><FaCheck />{feature}</li>
              ))}
            </ul>
            <Link href="/register/login" className="mt-8 text-center">
              <BlackButton>Get started with {plan.title}</BlackButton>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-24">
        <h2 className="text-3xl font-semibold">Looking for enterprise?</h2>
        <p className="text-slate-600 mt-4 w-[80%] mx-auto">Contact us about our Enterprise plans so we can discuss how to best get Ziggy integrated in your workflow.</p>
        <Link href="/info/contact?reason=Inquire About Enterprise Plan" className="mt-8 inline-block">
          <BlackButton>Contact us</BlackButton>
        </Link>
      </div>
    </main>
  )
}