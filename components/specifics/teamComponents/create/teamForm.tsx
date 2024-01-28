"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

export default function TeamForm({ teamInfo, setTeamInfo, setView } : { teamInfo : { name: string, interviewerName: string, context: string, plan: number }, setTeamInfo: Function, setView: Function }) {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(teamInfo)

    // create team with memebers being the current user.
    // grab the team id
    // send depending on the plan, send payment page
    // send to invite
    // back to dashboard
    setView(1)
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
          className="w-96 mt-4 border-b pb-2 text-base focus:outline-none"
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
          className="w-96 mt-4 border-b pb-2 text-base focus:outline-none"
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
          className="w-[50%] mt-4 resize-y border-b pb-2 text-base focus:outline-none"
          placeholder="Enter context for this team..."
          rows={4}
          value={teamInfo.context}
          onChange={(e) => setTeamInfo({...teamInfo, context: e.target.value})}
          required
          />
        </div>
        <div className="flex gap-4 items-center">
          <button type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
          <Link href="/dashboard">
              <HoverWords>Cancel</HoverWords>
          </Link>
        </div>
      </form>
    </main>
  )
}