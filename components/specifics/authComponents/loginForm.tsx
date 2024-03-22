"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import Link from "next/link"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { signIn } from "next-auth/react"

export default function LoginForm({ setView } : { setView: Function }) {
  const [email, setEmail] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const responseRegisterChecks = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email.trim(),
        type: "login"
      })
    })

    if (responseRegisterChecks.status === 500) {
      return setError("An error occurred. Please try again later.")
    }
    else if (responseRegisterChecks.status === 200) {
      await signIn('email', {
        email: email,
        callbackUrl: `${window.location.origin}/dashboard`,
        redirect: false
      })
    }
    else if (responseRegisterChecks.status === 403) {
      return setError("This email doesn't have a Ziggy account, please create one.")
    }

    setView(2)
    setLoading(false)
  }

  return (
    <main>
      <p className="text-slate-600 mt-6">Welcome back, we're glad you're here.</p>
      <div className="w-full sm:w-[40%] mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="text-left font-medium text-sm pb-1">
            <label><span className="text-red-600">*</span> Email</label>
          </div>
          <input
          type="email"
          className="w-full mt-1 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your email address..."
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <button disabled={loading} className="w-full mt-6" type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
        </form>
        <div className="mt-8 pt-6 border-t">
          <button disabled={loading} className="w-full" onClick={() => {
            setLoading(true)
            signIn('google', {
              callbackUrl: `${window.location.origin}/dashboard`
            })
          }}>
            <WhiteButton><p className="flex items-center gap-2 justify-center"><FcGoogle />Continue with Google</p></WhiteButton>
          </button>
          <button disabled={loading} className="w-full mt-6" onClick={() => {
            setLoading(true)
            signIn('github', {
              callbackUrl: `${window.location.origin}/dashboard`
            })
          }}>
            <WhiteButton><p className="flex items-center gap-2 justify-center"><FaGithub />Continue with GitHub</p></WhiteButton>
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-red-500">{error}</p>
      <p className="mt-12 text-slate-600 text-xs">Don't have a Ziggy account? <Link className="underline" href="/register/signup">Create one.</Link></p>
    </main>
  )
}