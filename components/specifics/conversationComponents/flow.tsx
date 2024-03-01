"use client"

import { useState } from "react"

import Welcome from "@/components/specifics/conversationComponents/welcome"
import Footer from "@/components/specifics/conversationComponents/footer"
import Collect from "@/components/specifics/conversationComponents/collect"
import FormStyle from "@/components/specifics/conversationComponents/formStyle"
import TextStyle from "@/components/specifics/conversationComponents/textStyle"

export default function Flow({ interviewData } : { interviewData: any }) {
  const [view, setView] = useState<number>(0)


  const [interviewee, setInterviewee] = useState<string>("Anonymous")

  const views = [
    <Welcome key="welcome" setView={setView} interviewInfo={interviewData} />,
    <Collect key="collect" setView={setView} interviewInfo={interviewData} setInterviewee={setInterviewee} />,
    <FormStyle key="formStyle" interviewInfo={interviewData} interviewee={interviewee} />,
    <TextStyle key="textStle" interviewInfo={interviewData} interviewee={interviewee} />
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