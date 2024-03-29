"use client"

import { useState } from "react"

import { teamSavedInfo } from "@/lib/types"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"

export default function GeneralSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function }) {

  const [teamInfo, setTeamInfo] = useState({
    name: team.name,
    interviewerName: team.interviewer,
    context: team.context,
  })

  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    await fetch("/api/teams/update", {
      method: "PUT",
      body: JSON.stringify({
        name: teamInfo.name,
        interviewerName: teamInfo.interviewerName,
        context: teamInfo.context,
        id: team.id
      })
    })

    setRefreshKey((prevKey: number) => prevKey + 1)
    return setLoading(false)
  }

  return (
    <main>
      <form className="grid gap-8 font-medium" onSubmit={handleSubmit}>
        <div className="rounded border p-4">
          <p className="font-medium"><span className="text-red-600">*</span> Update Team Name</p>
          <input
          type="text"
          className="w-full text-sm mt-4 border-b border-slate-600 pb-2 focus:outline-none"
          placeholder="Enter your team name..."
          maxLength={40}
          value={teamInfo.name}
          onChange={(e) => setTeamInfo({...teamInfo, name: e.target.value})}
          required
          />
          <div className="sm:flex items-center justify-between mt-6 text-sm">
            <p className="mb-4 sm:mb-0 text-slate-600 text-xs font-normal">Learn more about <Link target="_blank" className="underline" href="/info/blog">teams on Ziggy</Link></p>
            <button type="submit" disabled={loading}>
              <BlackButton>Update team name</BlackButton>
            </button>
          </div>
        </div>
        <div className="rounded border p-4">
          <p className="font-medium"><span className="text-red-600">*</span> Interviewer Name</p>
          <input
          type="text"
          className="w-full mt-4 border-b border-slate-600 pb-2 text-sm focus:outline-none"
          placeholder="Enter the interviewer's name..."
          maxLength={40}
          value={teamInfo.interviewerName}
          onChange={(e) => setTeamInfo({...teamInfo, interviewerName: e.target.value})}
          required
          />
          <div className="sm:flex items-center justify-between mt-6 text-sm">
            <p className="mb-4 sm:mb-0 text-slate-600 text-xs font-normal">Learn more about <Link target="_blank" className="underline" href="/info/blog">interviewer names</Link></p>
            <button type="submit" disabled={loading}>
              <BlackButton>Update interviewer name</BlackButton>
            </button>
          </div>
        </div>
        <div className="rounded border p-4">
          <p className="font-medium"><span className="text-red-600">*</span> Team Context</p>
          <textarea
          className="w-full mt-4 resize-y border border-slate-600 rounded p-2 text-sm focus:outline-none"
          placeholder="Enter context for this team..."
          rows={4}
          value={teamInfo.context}
          onChange={(e) => setTeamInfo({...teamInfo, context: e.target.value})}
          required
          />
          <div className="sm:flex items-center justify-between mt-6 text-sm">
            <p className="mb-4 sm:mb-0 text-slate-600 text-xs font-normal">Learn more about <Link target="_blank" className="underline" href="/info/blog">team context</Link></p>
            <button type="submit" disabled={loading}>
              <BlackButton>Update team context</BlackButton>
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}