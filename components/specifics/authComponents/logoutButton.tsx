"use client"

import { signOut } from "next-auth/react"

import BlackButton from "@/components/generics/blackButton"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({callbackUrl: `${window.location.origin}/register/login`})} className="w-full">
      <BlackButton>Logout</BlackButton>
    </button>
  )
}