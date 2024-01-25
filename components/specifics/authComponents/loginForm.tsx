"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import Link from "next/link"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function LoginForm({ setView } : { setView: Function }) {
  const [email, setEmail] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setView(2)
  }

  return (
    <main>
      <p className="text-slate-800 mt-6">Welcome back, we're glad you're here.</p>
      <div className="w-full sm:w-[40%] mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="text-left font-medium text-sm pb-1">
            <label><span className="text-red-600">*</span> Email</label>
          </div>
          <input
          type="email"
          className="w-full p-2 rounded border border-slate-300 text-sm bg-slate-100"
          placeholder="Enter your email address..."
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <button className="w-full mt-6" type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
        </form>
        <div className="mt-8 pt-6 border-t">
          <button className="w-full">
            <WhiteButton><p className="flex items-center gap-2 justify-center"><FcGoogle />Continue with Google</p></WhiteButton>
          </button>
          <button className="w-full mt-6">
          <WhiteButton><p className="flex items-center gap-2 justify-center"><FaGithub />Continue with GitHub</p></WhiteButton>
          </button>
        </div>
      </div>
      <p className="mt-12 text-slate-800 text-xs">Don't have a Ziggy account? <Link className="underline" href="/register/signup">Create one.</Link></p>
    </main>
  )
}