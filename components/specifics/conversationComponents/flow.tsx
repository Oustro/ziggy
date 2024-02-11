"use client"

import { useState, useEffect } from "react"

import { useParams, useRouter } from "next/navigation"



import Welcome from "@/components/specifics/conversationComponents/welcome"
import Footer from "@/components/specifics/conversationComponents/footer"

export default function Flow() {
  const externalId = useParams().interviewid
  const router = useRouter()

  const [view, setView] = useState<number>(0)

  const [interview, setInterview] = useState<any>({})

  const [loading, setLoading] = useState<boolean>(true)

  async function fetchInterview() {
    const responseInterviewGet = await fetch("/api/conversation/get?id=" + externalId)

    if (responseInterviewGet.status === 404) {
      return router.push("/")
    }

    const data = await responseInterviewGet.json()
    setInterview(data.interview)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchInterview()
  
  }, [])

  const views = [
    <Welcome setView={setView} interviewInfo={interview} />
  ]

  return loading ? (
    <>Loading</>
  ) : (
    <main className="w-full h-screen" style={{
      background: 'linear-gradient(to top right, #FFFFFF 40%, '+ interview.team.color +' 145%)'
    }}>
      {views[view]}
      <Footer />
    </main>
  )
}