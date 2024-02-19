"use client"

import { useState } from "react"

import { interviewSavedInfo } from "@/lib/types"

import InterviewNav from "@/components/specifics/navbars/interviewNav"
import Overview from "@/components/specifics/interviewComponents/dashboard/overview"

export default function InterviewDashboard({ interview } : { interview: interviewSavedInfo }) {
  const [view, setView] = useState(0)

  const views = [
    <Overview interview={interview} />,
    <div>Ask Ziggy</div>,
    <div>Search</div>,
    <div>Transcripts</div>,
    <div>Distribute</div>,
    <div>Edit Interview</div>
  ]

  return (
    <div>
      <InterviewNav setView={setView} interviewName={interview.name} />
      <div className="px-12 py-6">
        {views[view]}
      </div>
    </div>
  )
}