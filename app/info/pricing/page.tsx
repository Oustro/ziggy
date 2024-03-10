import { FaCheck } from "react-icons/fa"

import BlackButton from "@/components/generics/blackButton"

import Link from "next/link"

export default function Pricing() {

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Pricing Plans</h1>
      <p className="text-slate-600 mt-6 text-center">An affordable, simple pricing model to help you get the most out of your feedback with Ziggy.</p>
      <div className="w-full px-12 grid gap-8 grid-cols-3 mt-12">
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-semibold">Free Plan</h2>
          <h1 className="text-3xl mt-4 font-medium">$0 / month</h1>
          <p className="text-slate-600 mt-4 pb-4 border-b">The Free plan is made for teams who want to get try Ziggy without commitment.</p>
          <ul className="grid gap-3 mt-8 mb-8">
            <li className="flex items-center font-medium gap-3"><FaCheck /> No credit card required</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 3 interview templates</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 25 AI interviews / template</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 1 team member</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Community support</li>
          </ul>
          <Link href="/register/login" className="mt-8 text-center">
            <BlackButton>Get started with Free</BlackButton>
          </Link>
        </div>
        <div className="border border-slate-600 p-6 rounded">
          <h2 className="text-2xl font-semibold">Pro Plan</h2>
          <h1 className="text-3xl mt-4 font-medium">$24 / month</h1>
          <p className="text-slate-600 mt-4 pb-4 border-b">The Free plan is made for teams who want to get try Ziggy without commitment.</p>
          <ul className="grid gap-3 mt-8 mb-8">
            <li className="flex items-center font-medium gap-3"><FaCheck /> $0.30 / AI interview</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Unlimited interview templates</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 150 AI interviews / template</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 5 team member</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Email support</li>
          </ul>
          <Link href="/register/login" className="mt-8 text-center">
            <BlackButton>Get started with Pro</BlackButton>
          </Link>
        </div>
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-semibold">Business Plan</h2>
          <h1 className="text-3xl mt-4 font-medium">$79 / month</h1>
          <p className="text-slate-600 mt-4 pb-4 border-b">The Free plan is made for teams who want to get try Ziggy without commitment.</p>
          <ul className="grid gap-3 mt-8 mb-8">
            <li className="flex items-center font-medium gap-3"><FaCheck /> $0.30 / AI interview</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Unlimited interview templates</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 550 AI interviews / template</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 10 team member</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Priority support</li>
          </ul>
          <Link href="/register/login" className="mt-8 text-center">
            <BlackButton>Get started with Business</BlackButton>
          </Link>
        </div>
      </div>
      <div className="text-center mt-24">
        <h2 className="text-3xl font-semibold">Looking for more?</h2>
        <p className="text-slate-600 mt-4">Contact us about our Enterprise plans and we can talk about how to best get Ziggy integrated in your workflow.</p>
        <Link href="/info/contact" className="mt-8 inline-block">
          <BlackButton>Contact us</BlackButton>
        </Link>
      </div>
    </main>
  )
}