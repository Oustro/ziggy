
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart, BarElement } from 'chart.js'

import Spinner from "@/components/generics/spinner"

Chart.register(BarElement)

export default function Spread({ data } : { data: any }) {
  const [sentiments, setSentiments] = useState({
    bgColor: [],
    borderColor: []
  })
  const [questions, setQuestions] = useState([])
  const [counts, setCounts] = useState([])

  const [loading, setLoading] = useState(true)


  async function fetchInterviewSpread() {
    const responseAnalyticsSpread = await fetch('/api/analytics/spread?id='+data)

    if (responseAnalyticsSpread.status === 404) {
      return
    }

    if (responseAnalyticsSpread.status === 500) {
      return
    }

    const response = await responseAnalyticsSpread.json()

    setSentiments(response.sentiments)
    setQuestions(response.questions)
    setCounts(response.counts)

    return setLoading(false)
  }

  useEffect(() => {
    fetchInterviewSpread()
  }, [])

  return (
    <div className="w-[50%] rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Question Spread</h3>
      <p className="mt-2 text-slate-600">This metric shows the general sentiment interviewees answers have while responding to questions.</p>
      <div className="flex mt-8 justify-center text-center text-sm gap-6 font-medium">
        <div className="rounded-full px-2 border border-green-500 bg-green-200">
          <p>Positive Responses</p>
        </div>
        <div className="rounded-full px-2 border bg-slate-200 border-slate-600">
          <p>Neutral Responses</p>
        </div>
        <div className="rounded-full px-2 border border-red-400 bg-red-200">
          <p>Negative Responses</p>
        </div>
      </div>
      {loading ?
        <div className="mt-24 flex justify-center">
          <Spinner size={40} />
        </div>
      :
        <div className="mt-8 h-72">
          <Bar
          data={{
            labels: questions,
            datasets: [{
              label: 'Positive',
              data: counts,
              backgroundColor: sentiments.bgColor,
              borderColor: sentiments.borderColor,
              borderWidth: 2,
              animation: false,
              borderRadius: 3,
              hoverBackgroundColor: sentiments.bgColor,
              hoverBorderColor: sentiments.borderColor
            }]
          }}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0
              }
            },
            scales: {
              x: {
                display: true,
                grid: {
                  display: false
                },
              },
              y: {
                display: true,
                grid: {
                  display: false
                },
                ticks: {
                  callback: function(value, index, values) {
                    const question = questions[index] as string
                    return question.substring(0, 15) + '...'
                  },
                }
              },
            }
          }}
          />
        </div>
      }
    </div> 
  )
}