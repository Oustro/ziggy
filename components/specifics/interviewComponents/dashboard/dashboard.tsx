"use client"

import { useState } from "react"

import { interviewSavedInfo } from "@/lib/types";
import InterviewNav from "@/components/specifics/navbars/interviewNav"

export default function InterviewDashboard({ interview } : { interview: interviewSavedInfo }) {
  const [view, setView] = useState(1)

  const views = [
    <div>Overview</div>,
    <div>Ask Ziggy</div>,
    <div>Search</div>,
    <div>Transcripts</div>,
    <div>Distribute</div>,
    <div>Edit Interview</div>
  ]

  return (
    <div>
      <InterviewNav setView={setView} />
      {views[view]}
    </div>
  )
}