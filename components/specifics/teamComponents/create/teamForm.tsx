"use client"

import Link from "next/link"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

export default function TeamForm({ teamInfo, setTeamInfo, setView, setTeamId } : { teamInfo : { name: string, interviewerName: string, context: string }, setTeamInfo: Function, setView: Function, setTeamId: Function }) {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError("")

    const responseTeamCreate = await fetch("/api/teams/create", {
      method: "POST",
      body: JSON.stringify({
        name: teamInfo.name,
        interviewerName: teamInfo.interviewerName,
        context: teamInfo.context,
      })
    })

    if (!responseTeamCreate.ok) {
      setLoading(false)
      return setError("An error occurred. Please try again later.")
    }

    const teamId = await responseTeamCreate.json()
    setTeamId(teamId.teamId)
    setLoading(false)
    return setView(1)
  }

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Create a Team</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Teams are an important part of Ziggy. They provide context about your business or organzation to Ziggy for interviews. With more information, Ziggy is able to provide interviewees a better experience overall.</p>
      <form className="mt-8 grid gap-12 text-sm font-medium" onSubmit={handleSubmit}>
        <div>
          <label><span className="text-red-600">*</span> Team name</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">This is the name of your team.</p>
          <input
          type="text"
          className="w-full sm:w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your team name..."
          maxLength={40}
          value={teamInfo.name}
          onChange={(e) => setTeamInfo({...teamInfo, name: e.target.value})}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Interviewer name</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">Customize the name the Al takes when conducting interviews.</p>
          <input
          type="text"
          className="w-full sm:w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter the interviewer's name..."
          maxLength={40}
          value={teamInfo.interviewerName}
          onChange={(e) => setTeamInfo({...teamInfo, interviewerName: e.target.value})}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Team context</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">Providing context about your team allows Ziggy to tailor interviews to suit your exact requirements and needs.</p>
          <textarea
          className="w-full sm:w-[60%] mt-4 resize-y border border-slate-600 rounded p-2 text-base focus:outline-none"
          placeholder="Enter context for this team..."
          rows={4}
          value={teamInfo.context}
          onChange={(e) => setTeamInfo({...teamInfo, context: e.target.value})}
          required
          />
        </div>
        <div className="flex gap-4 items-center">
          <button type="submit" disabled={loading}>
            <BlackButton>Continue</BlackButton>
          </button>
          <Link href="/dashboard">
              <HoverWords>Cancel</HoverWords>
          </Link>
        </div>
      </form>
      
      <p className="mt-4 text-sm text-red-500">{error}</p>
    </main>
  )
}