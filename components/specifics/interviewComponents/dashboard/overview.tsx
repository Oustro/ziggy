
import { useState, useEffect } from "react"

import { interviewSavedInfo } from "@/lib/types"

import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement)

export default function Overview({ interview } : { interview: interviewSavedInfo }) {
  const [data, setData] = useState([10, 10, 10])
  const colors = ['#4ade80', '#cbd5e1', '#f43f5e']

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

    setData([positiive, neutral, negative])
  }

  useEffect(() => {
    getSentimentData()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Overview</h1>
      <div className="mt-8 flex gap-4">
        <div className="w-[50%] border border-slate-600 rounded p-4">
          <h3 className="text-2xl font-medium">Sentiment Analysis</h3>
          <p className="mt-2 text-sm">This metric shows the general sentiment interviewees answers have while responding to questions.</p>
          <div className="flex mt-8 w-[50%] mx-auto">
            {data.map((d, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-sm border border-slate-600 inline-block px-2 py-1 font-medium rounded-full"
                style={{
                  borderColor: colors[i]
                }}
                >{d} {i === 0 ? "Positive" : i === 1 ? "Neutral" : "Negative"}</p>
              </div>
            ))} 
          </div>
          <div className="mt-8 w-full text-center">
            <Doughnut
            data={{
              labels: ['Positive', 'Neutral', 'Negative'],
              datasets: [{
                data: data,
                backgroundColor: colors,
              }]
            }}
            options={{
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
            className="mx-auto"
            />
          </div>
        </div> 
        <div className="w-[50%] bg-green-400 rounded p-4">
          <h3 className="text-2xl font-medium">Question Spread</h3>
          <p className="mt-2 text-sm">Here is the spread of the questions asked in the interview. To see the question, hover over the bar.</p>
        </div>
      </div>
    </div>
  )
}