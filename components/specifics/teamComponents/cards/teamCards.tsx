"use client"

import { useState, useEffect } from "react"

import { teamSavedInfo } from "@/lib/types"

import { useSearchParams } from "next/navigation"

import LoadingCard from "@/components/specifics/teamComponents/cards/loadingCard"
import Card from "@/components/specifics/teamComponents/cards/card"

export default function TeamCards() {
  const searchParams = useSearchParams()

  const [teams, setTeams] = useState([] as teamSavedInfo[])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  
  async function fetchTeams() {
    const responseTeamsGet = await fetch("/api/teams/get")

    const data = await responseTeamsGet.json()
    setTeams(data.teams)

    setLoading(false)
  }

  useEffect(() => {
    fetchTeams()

  }, [refreshKey])

  return (
    <main className="px-12 mt-8 grid grid-cols-3 gap-6">
      {loading ? (
        new Array(3)).fill(0).map((_, i) => 
        <LoadingCard key={i} />
      ) : (teams.map((team) => (
        <Card team={team} key={team.id} open={team.id === searchParams.get("team") ? true : false} setRefreshKey={setRefreshKey} />
      )))}
    </main>
  )
}