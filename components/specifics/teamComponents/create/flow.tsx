"use client"

import { useState } from "react"

import TeamForm from "@/components/specifics/teamComponents/create/teamForm"
import SelectPlan from "@/components/specifics/teamComponents/create/selectPlan"

export default function Flow() {
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    interviewerName: "",
    context: "",
  })

  const [teamId, setTeamId] = useState<string>("")

  const [view, setView] = useState<number>(0)

  const views = [
    {
      content: <TeamForm teamInfo={teamInfo} setTeamInfo={setTeamInfo} setView={setView} setTeamId={setTeamId} />
    },
    {
      content: <SelectPlan teamId={teamId} />
    },
  ]

  return (
    <main>
      {views[view].content}
    </main>
  )
}