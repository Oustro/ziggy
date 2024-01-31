"use client"

import { useState, useEffect } from "react"

export default function Card() {
  const [teams, setTeams] = useState([])
  
  async function fetchTeams() {
    const responseTeamsGet = await fetch("/api/teams/get")
    const data = await responseTeamsGet.json()

    console.log(data)
  }

  useEffect(() => {
    fetchTeams()
  })

  return (
    <main>
      
    </main>
  )
}