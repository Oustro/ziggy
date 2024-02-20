import { useEffect, useState } from "react"

import BlackButton from "@/components/generics/blackButton"

export default function Trends({ data } : { data: any }) {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTrends() {
    const responseAnalyticsTrends = await fetch('/api/analytics/trends?id='+data)

    if (responseAnalyticsTrends.status === 404) {
      return
    }

    const response = await responseAnalyticsTrends.json()

    setTrends(response.analysis)
    return setLoading(false)
  }
  
  useEffect(() => {
    fetchTrends()
  }, [])


  return (
    <div className="w-[50%] rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Key Trends</h3>
      <p className="mt-2">This metric shows what people are talking about the most and returns the keywords mentioned in the interview.</p>
      {loading ?
        <p className="mt-24 mb-16 text-2xl text-center">Waiting for data...</p>
      :
        <div className="mt-8 h-72 overflow-scroll">
          {trends.map((trend: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-sm pb-4">
            <p className="truncate w-[70%] text-base">{trend}</p>
            <div className="flex gap-6">
              <BlackButton>Explore Topic</BlackButton>
            </div>
          </div>
          ))}
        </div>
      }
    </div> 
  )
}