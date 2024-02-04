import { interviewSavedInfo } from "@/lib/types"

import Link from "next/link"

import Badge from "@/components/generics/badge"
import TeamSettings from "@/components/specifics/settingComponents/teamSettings"
import BlackButton from "@/components/generics/blackButton"

export default function Card({ interview, open, setRefreshKey } : { interview: interviewSavedInfo, open: boolean, setRefreshKey: Function }) {

  return (
    <div className="border hover:border-slate-600 p-4 transition rounded shadow-sm">
      <div className="flex text-xs justify-between items-start">

        <p className="text-xl font-medium">{interview.name}</p>
        <div className="flex justify-between mt-8 text-sm">
          <p>{interview.guide.length} Questions</p>
          <p className="flex items-center gap-1">{interview.responses} Responses</p>
        </div>
      </div>
    </div>
  )
}