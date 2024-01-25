"use client"

import { useState } from "react"

import LoginForm from "@/components/specifics/authComponents/loginForm"
import SignupForm from "@/components/specifics/authComponents/signupForm"
import Confirm from "@/components/specifics/authComponents/confirm"

export default function Flow({ authType } : { authType: number}) {
  const [view, setView] = useState<number>(authType)

  const views = [
    {
      authType: 0,
      content: <LoginForm setView={setView} />
    },
    {
      authType: 1,
      content: <SignupForm setView={setView} />
    },
    {
      authType: 2,
      content: <Confirm />
    }
  ]
  return (
    <main>
      {views[view].content}
    </main>
  )
}