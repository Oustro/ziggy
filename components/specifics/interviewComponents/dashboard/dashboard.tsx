"use client"

import { useState } from "react"

import { interviewSavedInfo } from "@/lib/types"

import InterviewNav from "@/components/specifics/navbars/interviewNav"
import Overview from "@/components/specifics/interviewComponents/dashboard/overview"
import Ask from "@/components/specifics/interviewComponents/dashboard/ask"
import Search from "@/components/specifics/interviewComponents/dashboard/search"
import Transcripts from "@/components/specifics/interviewComponents/dashboard/transcripts"

export default function InterviewDashboard({ interview, checkReponseView } : { interview: interviewSavedInfo, checkReponseView: number }) {
  const [view, setView] = useState(checkReponseView)

  const views = [
    <Overview interview={interview} />,
    <Ask />,
    <Search />,
    <Transcripts />,
    <div>Distribute</div>,
    <div>Edit Interview</div>
  ]

  return (
    <div>
      <InterviewNav setView={setView} interviewName={interview.name} checkReponseView={checkReponseView} />
      <div className="px-12 py-6">
        {views[view]}
      </div>
    </div>
  )
}