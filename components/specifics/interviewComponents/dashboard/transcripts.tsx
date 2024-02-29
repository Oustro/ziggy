import { interviewSavedInfo } from "@/lib/types"

import { useState, useEffect } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import List from "@/components/specifics/interviewComponents/dashboard/transcriptComponents/list"
import Convo from "@/components/specifics/interviewComponents/dashboard/transcriptComponents/convo"

export default function Transcripts({ interview } : { interview: interviewSavedInfo }) {
  const searchParams = useSearchParams()
  const quickTranscript = searchParams.get("tid")
  const router = useRouter()
  const pathname = usePathname()

  const [transcriptView, setTranscriptView] = useState(0)
  const [tid, setTid] = useState(-1)

  const transcriptViews = [
    <List interview={interview} setTid={setTid} />,
    <Convo interview={interview} tid={tid} setTranscriptView={setTranscriptView} />
  ]

  useEffect(() => {
    if (tid > -1) {
      setTranscriptView(1)
    }
  }, [tid])

  useEffect(() => {
    if (quickTranscript) {
      for (let i = 0; i < interview.transcript.length; i++) {
        if (interview.transcript[i].id === quickTranscript) {
          setTid(i)
          router.push(pathname)
          return setTranscriptView(1)
        }
      }
    }
  }, [quickTranscript])


  return (
    <div>
      {transcriptViews[transcriptView]}
    </div>
  )
}