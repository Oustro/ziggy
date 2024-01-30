"use client"

import { useState } from "react"

import TeamForm from "@/components/specifics/teamComponents/create/teamForm"
import SelectPlan from "@/components/specifics/teamComponents/create/selectPlan"

export default function Flow({ userInfo } : { userInfo: any }) {
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    interviewerName: "",
    context: "",
  })

  const [view, setView] = useState<number>(0)

  const views = [
    {
      content: <TeamForm teamInfo={teamInfo} setTeamInfo={setTeamInfo} setView={setView} />
    },
    {
      content: <SelectPlan teamInfo={teamInfo} setTeamInfo={setTeamInfo} setView={setView} customerId={userInfo.customerId} />
    },
  ]

  return (
    <main>
      {views[view].content}
    </main>
  )
}