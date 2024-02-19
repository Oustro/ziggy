
import { useState, useEffect } from "react"

import { interviewSavedInfo } from "@/lib/types"

import Sentiment from "@/components/specifics/interviewComponents/dashboard/overviewComponents/sentiment"


export default function Overview({ interview } : { interview: interviewSavedInfo }) {
  const [data, setData] = useState([10, 10, 10])

  const [questions, setQuestions] = useState<string[]>([])

  function getSentimentData() {
    let positiive = 0
    let neutral = 0
    let negative = 0

    for (let i = 0; i < interview.transcript.length; i++) {
      if (interview.transcript[i].sentiment > 0) {
        positiive++
      }
      else if (interview.transcript[i].sentiment < 0) {
        negative++
      }
      else {
        neutral++
      }
    }

    let questionsGuide = []
    for (let i = 0; i < interview.guide.length; i++) {
      questionsGuide.push(interview.guide[i].question)
    }

    setQuestions(questionsGuide)
    setData([positiive, neutral, negative])
  }

  useEffect(() => {
    getSentimentData()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Overview</h1>
      <div className="mt-8 flex gap-4">
        <Sentiment data={data} />
        <div className="w-[50%] rounded p-4 border border-slate-600">

        </div>
      </div>
    </div>
  )
}