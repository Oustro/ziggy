"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function LoginForm() {
  const [email, setEmail] = useState<string>("")

  return (
    <main>
      <div className="w-full sm:w-[40%] mx-auto">
        <form>
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
    </main>
  )
}