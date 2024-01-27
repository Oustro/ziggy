"use client"

import { useState } from "react"

import TeamForm from "@/components/specifics/teamComponents/teamForm"

export default function Flow({ userInfo } : { userInfo: any }) {
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    interviewerName: "",
    context: "",
    plan: 0
  })

  const [view, setView] = useState<number>(0)

  const views = [
    {
      content: <TeamForm teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
    },
  ]

  return (
    <main>
      {views[view].content}
    </main>
  )
}