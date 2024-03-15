
import { useEffect, useState } from "react"

import Spinner from "@/components/generics/spinner"

import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, PointElement, LinearScale, LineElement } from 'chart.js'
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)

export default function Activity({ data } : { data: any }) {

  const [labels, setLabels] = useState<string[]>([])
  const [interviews, setInterviews] = useState<Date[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  async function getInterviewActivity() {
    const responseAnalyticsActivity = await fetch(`/api/analytics/activity?id=${data}`)

    if (responseAnalyticsActivity.status === 404) {
      return
    }

    if (responseAnalyticsActivity.status === 500) {
      return
    }

    const response = await responseAnalyticsActivity.json()

    setLabels(response.dates)
    setInterviews(response.interviews)

    return setLoading(false)
  }
  
  useEffect(() => {
    getInterviewActivity()
  }, [])

  return (
    <div className="mt-8 sm:mt-0 sm:w-[50%] rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Interview Activity</h3>
      <p className="mt-2 text-slate-600">This graph shows when interviews take place and how many were conducted on a particular day.</p>
      {loading ? 
        <div className="mt-24 flex justify-center">
          <Spinner size={40} />
        </div>
      :
        <div className="mt-8 h-96">
          <Line
          data={{
            labels: labels,
            datasets: [{
              label: 'My First Dataset',
              data: interviews,
              fill: true,
              animation: false,
              borderWidth: 2,
              borderColor: '#475569',
              tension: 0.09
            }]
          }}
          options={{
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
              },
              y: {
                display: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true
              },
            },
          }}
          />
        </div>
      }
    </div> 
  )
}