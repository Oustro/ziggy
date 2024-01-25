"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import Link from "next/link"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { signIn } from "next-auth/react"

export default function SignupForm({ setView } : { setView: Function }) {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const registerChecksResponse = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email.trim(),
        name: name.trim()
      })
    })

    if (registerChecksResponse.status === 403) {
      return alert("You are already registered!")
    }

    if (registerChecksResponse.status === 500) {
      return alert("An error occurred. Please try again later.")
    }

    await signIn('email', {
      email: email,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false
    })

    setView(2)
  }

  return (
    <main>
      <p className="mt-6 text-slate-800">Create your free Ziggy account, no credit card required.</p>
      <div className="w-full sm:w-[40%] mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="text-left font-medium text-sm pb-1">
            <label><span className="text-red-600">*</span> Name</label>
          </div>
          <input
          type="text"
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
          <button className="w-full mt-6" type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
        </form>
        <div className="mt-8 pt-6 border-t">
          <button className="w-full" onClick={() => signIn('google', {
            callbackUrl: `${window.location.origin}/dashboard`
          })}>
            <WhiteButton><p className="flex items-center gap-2 justify-center"><FcGoogle />Continue with Google</p></WhiteButton>
          </button>
          <button className="w-full mt-6" onClick={() => signIn('github', {
            callbackUrl: `${window.location.origin}/dashboard`
          })}>
          <WhiteButton><p className="flex items-center gap-2 justify-center"><FaGithub />Continue with GitHub</p></WhiteButton>
          </button>
        </div>
      </div>
      <p className="mt-12 text-slate-800 text-xs">By continuing, you agree to the <Link className="underline" href="/info/legal">Terms of Service and Privacy Policy.</Link></p>
    </main>
  )
}