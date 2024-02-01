import { teamSavedInfo } from "@/lib/types"

import { TbMicrophone2 } from "react-icons/tb"

import Link from "next/link"

import Badge from "@/components/generics/badge"
import TeamSettings from "@/components/specifics/settingComponents/teamSettings"
import BlackButton from "@/components/generics/blackButton"

export default function Card({ team, open, setRefreshKey } : { team: teamSavedInfo, open: boolean, setRefreshKey: Function }) {

  return (
    <div className="border hover:border-slate-600 p-4 transition rounded shadow-sm">
      <div className="flex text-xs justify-between items-start">
        <Badge>{team.plan === 0 ? "Free" : team.plan === 1 ? "Pro" : "Enterprise"}</Badge>
        <TeamSettings initOpen={open} team={team} setRefreshKey={setRefreshKey}>
          <BlackButton>•••</BlackButton>
        </TeamSettings>
      </div>
      <Link href={`/dashboard/${team.id}`}>
        <p className="text-xl font-medium">{team.name}</p>
        <div className="flex justify-between mt-8 text-sm">
          <p className="flex items-center gap-1"><TbMicrophone2 />{team.interviewer}</p>
          <p className="flex items-center gap-1">{team.members.length} Members</p>
        </div>
      </Link>
    </div>
  )
}