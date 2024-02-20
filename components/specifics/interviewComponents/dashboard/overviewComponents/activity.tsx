
import { use, useEffect, useState } from "react"

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

    const response = await responseAnalyticsActivity.json()
    console.log(response)

    setLabels(response.dates)
    setInterviews(response.interviews)

    return setLoading(false)
  }
  
  useEffect(() => {
    getInterviewActivity()
  }, [])

  return (
    <div className="w-full rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Interview Activity</h3>
      <p className="mt-2">This graph shows when interviews take place and how many were conducted on a particular day.</p>
      {loading ? 
        <p className="mt-24 mb-16 text-2xl text-center">Waiting for data...</p>
      :
        <div className="mt-8 h-96">
          <Line
          data={{
            labels: labels,
            datasets: [{
              label: 'My First Dataset',
              data: interviews,
              fill: true,
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