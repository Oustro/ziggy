"use client"

import { useState, useEffect } from "react"


import Welcome from "@/components/specifics/conversationComponents/welcome"
import Footer from "@/components/specifics/conversationComponents/footer"
import Collect from "@/components/specifics/conversationComponents/collect"
import MainConversation from "@/components/specifics/conversationComponents/conversation/mainConversation"

export default function Flow({ interviewData } : { interviewData: any }) {
  const [view, setView] = useState<number>(0)


  const [interviewee, setInterviewee] = useState<string>("Anonymous")

  const views = [
    <Welcome setView={setView} interviewInfo={interviewData} />,
    <Collect setView={setView} interviewInfo={interviewData} setInterviewee={setInterviewee} />,
    <MainConversation setView={setView} interviewInfo={interviewData} interviewee={interviewee} />
  ]

  return (
    <main className="w-full h-screen" style={{
      background: 'linear-gradient(to top right, #FFFFFF 40%, '+ interviewData.team.color +' 145%)'
    }}>
      {views[view]}
      <Footer />
    </main>
  )
}