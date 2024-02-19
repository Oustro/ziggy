
import { useState, useEffect } from "react"

import { interviewSavedInfo } from "@/lib/types"

import Sentiment from "@/components/specifics/interviewComponents/dashboard/overviewComponents/sentiment"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"
import HoverWords from "@/components/generics/hoverWords"

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
      <div className="mt-8 flex gap-8">
        <div className="w-[50%]">
          <div className="p-6 border border-slate-600 rounded">
            <h3 className="text-2xl font-medium">Purpose</h3>
            <p className="mt-2">{interview.purpose}</p>
          </div>
          <div className="p-6 h-96 mt-8 border border-slate-600 rounded">
            <h3 className="text-2xl font-medium">Questions</h3>
            <div className="mt-4 h-[75%] overflow-scroll">
              {questions.map((question, index) => (
                <div key={index} className="flex justify-between items-center text-sm pb-4">
                  <p className="truncate w-[50%]">{question}</p>
                  <div className="flex gap-6">
                    <WhiteButton>Ask Ziggy</WhiteButton>
                    <BlackButton>View Answers</BlackButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <HoverWords>Update interview questions</HoverWords>
            </div>
          </div>
        </div>
        <Sentiment data={data} />
      </div>
    </div>
  )
}