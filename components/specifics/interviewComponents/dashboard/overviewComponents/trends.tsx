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

    if (responseAnalyticsTrends.status === 500) {
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
    <div className="w-full rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Key Trends in this interview</h3>
      <p className="mt-2">Here are some interesting things from your interview you might want to explore.</p>
      {loading ?
        <p className="mt-24 mb-16 text-2xl text-center">Waiting for data...</p>
      :
        <div className="mt-8 grid grid-cols-4 gap-4">
          {trends.map((trend: any, index: number) => (
            <div key={index} className="group border rounded p-4 hover:border-slate-600 transition-all">
              <p className="text-base">{trend}</p>
              <p className="group-hover:translate-x-1 transition text-xs mt-4">Explore &rsaquo;</p>
            </div>
          ))}
        </div>
      }
    </div> 
  )
}