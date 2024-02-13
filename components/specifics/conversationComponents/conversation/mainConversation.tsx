"use client"

import { useState, useEffect } from "react"

import Prompt from "@/lib/prompt"

export default function MainConversation({ setView, interviewInfo, interviewee } : { setView: Function, interviewInfo: any, interviewee: string }) {
  const [conversation, setConversation] = useState<any>(null)

  async function setUpConversation() {  
    setConversation([
      {
        "role": "system",
        "content": Prompt(interviewInfo.team.interviewerName, interviewInfo.team.name, interviewInfo.team.purpose, interviewInfo.guide)
      },
      {
        "role": "assistant",
        "content": "Hi I'm, " + interviewInfo.team.interviewerName + ", an AI model created by Ziggy used to gather feedback for the " + interviewInfo.team.name + " team. Are you ready to get started?"
      },
      {
        "role": "user",
        "content": "I am, let's start."
      }
    ])
  }
  
  
  useEffect(() => {
    setUpConversation()
  }, [])


  return (
    <main>
      <h1>{interviewee}</h1>
    </main>
  )
}