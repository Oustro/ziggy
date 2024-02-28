import Badge from "@/components/generics/badge"
import BlackButton from "@/components/generics/blackButton"

import { useRouter, usePathname } from "next/navigation"

export default function SourceBox({ score, metadata } : { score: number, metadata: {answer: string, answerSentiment: string, interviewee: string, mostSimiliarQuestion: string, question: string, transcriptId: string} }) {
  const router = useRouter()
  const pathname = usePathname()

  function viewTranscript() {
    router.push(pathname+"?tid="+metadata.transcriptId)
  }

  return (
    <div className="mt-4 border border-slate-600 rounded">
      <div className="p-4 pb-8 border-b border-slate-600">
        <p className="font-medium">{metadata.question}</p>
        <p className="mt-4">{metadata.answer}</p>
      </div>
      <div className="flex items-center p-4 justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-full">
            <Badge>{metadata.answerSentiment}</Badge>
          </div>
          <Badge>{(100 * score).toFixed(0)}% Question match</Badge>
        </div>
        <div className="flex items-center gap-4">
          <p>{metadata.interviewee}</p>
          <button onClick={() => viewTranscript()} type="button">
            <BlackButton>View Transscript </BlackButton>
          </button>
        </div>
      </div>
    </div>
  )
}