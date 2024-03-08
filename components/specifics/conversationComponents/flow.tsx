"use client"

import { useState } from "react"

import Welcome from "@/components/specifics/conversationComponents/welcome"
import Footer from "@/components/specifics/conversationComponents/footer"
import Collect from "@/components/specifics/conversationComponents/collect"
import FormStyle from "@/components/specifics/conversationComponents/formStyle"
import TextStyle from "@/components/specifics/conversationComponents/textStyle"
import ProgressBar from "@/components/specifics/conversationComponents/progressBar"

export default function Flow({ interviewData } : { interviewData: any }) {
  const [view, setView] = useState<number>(0)
  const [mostRecentQuestion, setMostRecentQuestion] = useState<string>("")

  const [interviewee, setInterviewee] = useState<string>("Anonymous")

  const views = [
    <Welcome key="welcome" setView={setView} interviewInfo={interviewData} />,
    <Collect key="collect" setView={setView} interviewInfo={interviewData} setInterviewee={setInterviewee} />,
    <TextStyle key="textStle" interviewInfo={interviewData} interviewee={interviewee} setMostRecentQuestion={setMostRecentQuestion} />,
    <FormStyle key="formStyle" interviewInfo={interviewData} interviewee={interviewee} setMostRecentQuestion={setMostRecentQuestion} />
  ]

  return (
    <main className="w-full h-screen" style={{
      background: 'linear-gradient(to top right, #FFFFFF 40%, '+ interviewData.team.color +' 145%)'
    }}>
      <ProgressBar interviewInfo={interviewData} mostRecentQuestion={mostRecentQuestion} />
      {views[view]}
      <Footer />
    </main>
  )
}