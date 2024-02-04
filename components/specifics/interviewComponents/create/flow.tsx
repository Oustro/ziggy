"use client"

import { useState } from "react"

import InterviewForm from "@/components/specifics/interviewComponents/create/interviewForm"
import CreateQuestions from "@/components/specifics/interviewComponents/create/createQuestions"

export default function Flow() {
  const [interviewInfo, setInterviewInfo] = useState({
    name: "",
    purpose: "",
    collect: false,
    questions: []
  })

  const [view, setView] = useState<number>(0)

  const views = [
    {
      content: <InterviewForm interviewInfo={interviewInfo} setInterviewInfo={setInterviewInfo} setView={setView} />
    },
    {
      content: <CreateQuestions interviewInfo={interviewInfo} setInterviewInfo={setInterviewInfo} setView={setView} />
    },
  ]

  return (
    <main>
      {views[view].content}
    </main>
  )
}