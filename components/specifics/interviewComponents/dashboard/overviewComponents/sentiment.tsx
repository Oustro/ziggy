import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement)

export default function Sentiment({ data } : { data: number[] }) {
  return (
    <div className="w-[50%] rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Sentiment Analysis</h3>
      <p className="mt-2">This metric shows the general sentiment interviewees answers have while responding to questions.</p>
      <div className="flex mt-8 justify-center text-sm gap-6 font-medium">
        <div className="rounded-full px-2 border border-green-500 bg-green-200">
          <p>{data[0]} Positive</p>
        </div>
        <div className="rounded-full px-2 border bg-slate-200 border-slate-600">
          <p>{data[1]} Neutral</p>
        </div>
        <div className="rounded-full px-2 border border-red-400 bg-red-200">
          <p>{data[2]} Negative</p>
        </div>
      </div>
      <div className="mt-8 w-full text-center">
        {data[0] === 0 && data[1] === 0 && data[2] === 0 ?
          <p className="mt-24 text-2xl">No data available</p>
        : 
          <Doughnut
          data={{
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
              data: data,
              backgroundColor: ['#bbf7d0', '#e2e8f0', '#fecaca'],
              borderRadius: 5,
              borderWidth: 2,
              spacing: 10,
              animation: false,
              hoverBackgroundColor: ['#bbf7d0', '#e2e8f0', '#fecaca'],
              hoverBorderWidth: 2,
              hoverBorderColor: ['#22c55e', '#475569', '#f43f5e'],
              borderColor: ['#22c55e', '#475569', '#f43f5e'],
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          className="mx-auto"
          />
        }
      </div>
    </div> 
  )
}