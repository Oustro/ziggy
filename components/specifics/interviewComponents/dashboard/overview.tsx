
import { useState, useEffect } from "react"

import { interviewSavedInfo } from "@/lib/types"

import Sentiment from "@/components/specifics/interviewComponents/dashboard/overviewComponents/sentiment"
import Spread from "@/components/specifics/interviewComponents/dashboard/overviewComponents/spread"
import Trends from "@/components/specifics/interviewComponents/dashboard/overviewComponents/trends"
import Activity from "@/components/specifics/interviewComponents/dashboard/overviewComponents/activity"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import { useRouter, usePathname } from "next/navigation"

export default function Overview({ interview, setView } : { interview: interviewSavedInfo, setView: Function }) {
  const [data, setData] = useState([10, 10, 10])

  const [questions, setQuestions] = useState<string[]>([])

  const router = useRouter()
  const pathname = usePathname()

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

  const quickAsk = async (question: string) => {
    router.push(pathname+"?q="+question)
    setView(1)
  }

  useEffect(() => {
    getSentimentData()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Overview</h1>
      <p className="mt-2">Go through the data Ziggy has collected from interviews.</p>
      <div className="mt-8">
        <Trends data={interview.id} />
      </div>
      <div className="mt-8 flex gap-8 w-full">
        <div className="w-[50%] flex flex-col">
          <div className="p-6 border border-slate-600 rounded">
            <h3 className="text-2xl font-medium">Purpose</h3>
            <p className="mt-2">{interview.purpose}</p>
          </div>
          <div className="flex-grow p-6 mt-8 border border-slate-600 rounded">
            <h3 className="text-2xl font-medium">Questions</h3>
            <div className="mt-4 h-full overflow-scroll">
              {questions.map((question, index) => (
                <div key={index} className="flex justify-between items-center text-sm pb-4">
                  <p className="truncate w-[55%] text-base">{question}</p>
                  <div className="flex gap-6 text-center">
                    <button onClick={() => quickAsk(question)}>
                      <WhiteButton>Summarize Answers</WhiteButton>  
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Sentiment data={data} />
      </div>
      <div className="mt-8 flex gap-8">
        <Spread data={interview.id} />
        <Activity data={interview.id} />
      </div>
    </div>
  )
}