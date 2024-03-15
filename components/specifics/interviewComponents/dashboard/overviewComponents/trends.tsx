import { useEffect, useState } from "react"

import { useRouter, usePathname } from "next/navigation"

import Spinner from "@/components/generics/spinner"

export default function Trends({ data, setView } : { data: any, setView: Function }) {
  const [trends, setTrends] = useState<Array<string>>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()

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

  const quickAsk = (question: string) => {
    router.push(pathname+"?q="+question)
    return setView(1)
  }


  return (
    <div className="w-full rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Key Trends in this interview</h3>
      <p className="mt-2 text-slate-600">Here are some interesting things from your interview you might want to explore.</p>
      {loading ?
        <div className="mt-24 mb-24 flex justify-center">
          <Spinner size={40} />
        </div>
      :
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {trends.map((trend: string, index: number) => (
            <button key={index} onClick={() => quickAsk(`Explain what "${trend}" means in the context of this interview?`)}>
              <div key={index} className="group border rounded p-4 hover:border-slate-600 transition-all text-left">
                <p className="text-base line-clamp">{trend}</p>
                <p className="group-hover:translate-x-1 transition text-xs mt-4">Explore &rsaquo;</p>
              </div>
            </button>   
          ))}
        </div>
      }
      <style jsx>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      `}</style>
    </div> 
  )
}