"use client"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

export default function SelectPlan({ teamInfo, setTeamInfo, setView } : { teamInfo : { name: string, interviewerName: string, context: string, plan: number }, setTeamInfo: Function, setView: Function }) {


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(teamInfo)

    // create team with memebers being the current user.
    // grab the team id
    // send depending on the plan, send payment page
    // send to invite
    // back to dashboard
  }

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Select a Plan</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Flames.</p>
    </main>
  )
}