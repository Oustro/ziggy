"use client"

import { useState, useEffect } from "react"

import { useRouter, useParams } from "next/navigation"

export default function FileCards() {
  const router = useRouter()
  const teamId = useParams().teamid

  async function fetchFolders() {
    const responseTeamFolderGet = await fetch("/api/teams/folders/get?teamid=" + teamId)

    // if (responseTeamFolderGet.status === 207) {
    //   router.push("/dashboard/" + teamId + "/create")
    // }

    
  }

  useEffect(() => {
    fetchFolders()

  }, [])

  return (
    <main className="px-12 mt-8 mb-16 grid grid-cols-3 gap-6">
      {teamId}
    </main>
  )
}