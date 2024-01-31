"use client"

import { useState, useEffect } from "react"

import { teamSavedInfo } from "@/lib/types"

export default function TeamCards() {
  const [teams, setTeams] = useState([] as teamSavedInfo[])
  const [loading, setLoading] = useState(true)
  
  async function fetchTeams() {
    const responseTeamsGet = await fetch("/api/teams/get")
    const data = await responseTeamsGet.json()
    setTeams(data.teams)
  }

  useEffect(() => {
    fetchTeams()
    setLoading(false)

  }, [])

  return (
    <main>
      
    </main>
  )
}