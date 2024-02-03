"use client"

import { useState, useEffect } from "react"

import { useParams } from "next/navigation"

export default function FileCards() {
  const teamId = useParams().teamid

  const [createFolder, setCreateFolder] = useState<boolean>(false)

  async function fetchFolders() {
    const responseTeamFolderGet = await fetch("/api/teams/folders/get?teamid=" + teamId)

    if (responseTeamFolderGet.status === 207) {
      return setCreateFolder(true)
    }
    
  }

  useEffect(() => {
    fetchFolders()

  }, [])

  return (
    <main className="px-12 mt-8 mb-16 grid grid-cols-3 gap-6">
      {teamId} {createFolder ? "true" : "false"}
    </main>
  )
}