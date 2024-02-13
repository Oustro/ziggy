"use client"

import { useState, useEffect } from "react"

import Prompt from "@/lib/prompt"
import { Open } from "@/utils/converse"


export default function MainConversation({ setView, interviewInfo, interviewee } : { setView: Function, interviewInfo: any, interviewee: string }) {
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([])
  const [transcriptId, setTranscriptId] = useState<string>("")

  async function setUpConversation() {  
    const opening = [
      {
        role: "system",
        content: Prompt(interviewInfo.team.interviewerName, interviewInfo.team.name, interviewInfo.team.purpose, interviewInfo.guide)
      },
      {
        role: "assistant",
        content: "Hi I'm, " + interviewInfo.team.interviewerName + ", an AI model created by Ziggy used to gather feedback for the " + interviewInfo.team.name + " team. Are you ready to get started?"
      },
      {
        role: "user",
        content: "I am, let's start."
      }
    ]

    const newtId = await Open(opening, interviewee, interviewInfo.id)

    setTranscriptId(newtId.tid)

    setConversation(newtId.updatedConvo)
  }
  
  
  useEffect(() => {
    if (!transcriptId) {
      setUpConversation()
    }

  }, [])


  return (
    <main>
      <h1>{interviewee}</h1>
    </main>
  )
}