import { useEffect, useState } from "react"

import { progress } from "@/utils/utility"

export default function ProgressBar({ interviewInfo, mostRecentQuestion, finishedInterview } : { interviewInfo: any, mostRecentQuestion: string, finishedInterview: boolean }) {
  const [progressBarWidth, setProgressBarWidth] = useState<string>("10%")


  async function calculateProgress() {
    const questionIndex = await progress(interviewInfo.guide, mostRecentQuestion) as string

    if (parseInt(questionIndex) === interviewInfo.guide.length) {
      return setProgressBarWidth("90%")
    }

    const interviewCompletion = (parseInt(questionIndex) / interviewInfo.guide.length) * 100 + "%"

    return setProgressBarWidth(interviewCompletion)
  }

  useEffect(() => {
    if (finishedInterview) {
      return setProgressBarWidth("100%")
    }

    if (mostRecentQuestion === "") {
      return setProgressBarWidth("10%")
    }
    calculateProgress() 
  }, [mostRecentQuestion, finishedInterview])

  return (
    <div className="absolute top-0 h-4 text-center rounded transition-all duration-300 ease-in-out"
    style={{
      width: progressBarWidth,
      background: interviewInfo.team.color
    }}
    />
  )
}