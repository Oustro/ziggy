"use client"

import { useState } from "react"

import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

export default function GeneralSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function}) {

  const [teamInfo, setTeamInfo] = useState({
    name: team.name,
    interviewerName: team.interviewer,
    context: team.context,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    const responseTeamCreate = await fetch("/api/teams/update", {
      method: "PUT",
      body: JSON.stringify({
        name: teamInfo.name,
        interviewerName: teamInfo.interviewerName,
        context: teamInfo.context,
        id: team.id
      })
    })

    if (!responseTeamCreate.ok) {
      setLoading(false)
      return setError("An error occurred. Please try again later.")
    }

    setRefreshKey((prevKey: number) => prevKey + 1)
    setLoading(false)
  }

  return (
    <main>
      <p className="text-slate-600">Update any information so Ziggy can best reflect and represent your team.</p>
      <form className="grid gap-12 text-sm font-medium mt-8" onSubmit={handleSubmit}>
        <div>
          <label><span className="text-red-600">*</span> Team name</label>
          <input
          type="text"
          className="w-full mt-4 border-b pb-2 text-base focus:outline-none"
          placeholder="Enter your team name..."
          maxLength={40}
          value={teamInfo.name}
          onChange={(e) => setTeamInfo({...teamInfo, name: e.target.value})}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Interviewer name</label>
          <input
          type="text"
          className="w-full mt-4 border-b pb-2 text-base focus:outline-none"
          placeholder="Enter the interviewer's name..."
          maxLength={40}
          value={teamInfo.interviewerName}
          onChange={(e) => setTeamInfo({...teamInfo, interviewerName: e.target.value})}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Team context</label>
          <textarea
          className="w-full mt-4 resize-y border-b pb-2 text-base focus:outline-none"
          placeholder="Enter context for this team..."
          rows={4}
          value={teamInfo.context}
          onChange={(e) => setTeamInfo({...teamInfo, context: e.target.value})}
          required
          />
        </div>
        <div className="flex justify-end gap-4 items-center">
          <button type="submit" disabled={loading}>
            <BlackButton>Update</BlackButton>
          </button>
        </div>
      </form>
      <p className="mt-4 text-sm text-red-500">{error}</p>
    </main>
  )
}