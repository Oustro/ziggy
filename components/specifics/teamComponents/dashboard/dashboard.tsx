"use client"

import { useState, useEffect } from "react"

import { useRouter, useParams } from "next/navigation"

import Link from "next/link"
import BlackButton from "@/components/generics/blackButton"
import { IoAdd } from "react-icons/io5"

export default function TeamDashboard() {
  const teamid = useParams().teamid
  const router = useRouter()
  
  async function fetchInterviews() {
    const responseInterviewsGet = await fetch("/api/interviews/get?id=" + teamid)

    if (responseInterviewsGet.status === 207) {
      router.push("/dashboard/"+teamid+"/create")
    }

    const data = await responseInterviewsGet.json()

  }

  useEffect(() => {
    fetchInterviews()
  }, [])

  return (
    <main>
      <div className="flex items-center justify-between mt-6 px-12">
        <h1 className="text-4xl font-semibold">Te</h1>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard/create" className="flex items-center gap-2">
            <BlackButton><span className="flex items-center gap-1"><IoAdd /> Create Team</span></BlackButton>
          </Link>
        </div>
      </div>
    </main>
  )
}