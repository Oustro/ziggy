"use client"

import { useState } from "react"

import { useParams } from "next/navigation"

import Welcome from "@/components/specifics/conversationComponents/welcome"

export default function Flow() {
  const interviewId = useParams().interviewid

  const [view, setView] = useState<number>(0)

  const views = [
    <Welcome setView={setView} />
  ]

  return (
    <main className="w-full h-screen">
      {views[view]}
    </main>
  )
}