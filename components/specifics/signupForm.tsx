"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

export default function SignupForm() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  return (
    <main>
      <div className="w-full sm:w-[40%] mx-auto px-6">
        <form>
          <div className="text-left font-medium text-sm pb-1">
            <label><span className="text-red-600">*</span> Name</label>
          </div>
          <input
          type="email"
          className="w-full p-2 rounded border border-slate-300 text-sm bg-slate-100"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
          required
          />
          <div className="text-left font-medium text-sm pb-1 mt-6">
            <label><span className="text-red-600">*</span> Work Email</label>
          </div>
          <input
          type="email"
          className="w-full p-2 rounded border border-slate-300 text-sm bg-slate-100"
          placeholder="Enter your email address..."
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <button className="w-full mt-10" type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
        </form>
        <div className="mt-8 pt-6 border-t">
          <button className="w-full">
            <WhiteButton>Continue with Google</WhiteButton>
          </button>
          <button className="w-full mt-6">
            <WhiteButton>Continue with Github</WhiteButton>
          </button>
        </div>
      </div>
    </main>
  )
}