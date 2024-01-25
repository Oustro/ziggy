"use client"

import { signOut } from "next-auth/react"

import BlackButton from "@/components/generics/blackButton"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({callbackUrl: `${window.location.origin}/register/login`})}>
      <BlackButton>Logout</BlackButton>
    </button>
  )
}