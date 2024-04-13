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
    <Overview key="overview" interview={interview} setView={setView} />,
    <Results key="results" interviewid={interview.id} setView={setView} />,
    <Transcripts key="transcripts" interview={interview} />,
    <Distribute key="distribute" externalId={interview.externalID} interviewName={interview.name} checkResponseView={checkReponseView} />
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