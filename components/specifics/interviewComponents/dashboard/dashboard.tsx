"use client"

import { useState } from "react"

import { interviewSavedInfo } from "@/lib/types"

import InterviewNav from "@/components/specifics/navbars/interviewNav"
import Overview from "@/components/specifics/interviewComponents/dashboard/overview"
import Results from "@/components/specifics/interviewComponents/dashboard/results"
import Transcripts from "@/components/specifics/interviewComponents/dashboard/transcripts"
import Distribute from "@/components/specifics/interviewComponents/dashboard/distribute"

export default function InterviewDashboard({ interview, checkReponseView } : { interview: interviewSavedInfo, checkReponseView: number }) {
  const [view, setView] = useState(checkReponseView)

  const views = [
    <Overview interview={interview} setView={setView} />,
    <Results interviewid={interview.id} setView={setView} />,
    <Transcripts interview={interview} />,
    <Distribute externalId={interview.externalID} interviewName={interview.name} />
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