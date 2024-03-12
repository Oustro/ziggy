import Badge from "@/components/generics/badge"
import BlackButton from "@/components/generics/blackButton"

import { useRouter, usePathname } from "next/navigation"

export default function SourceBox({ score, metadata, setView } : { score: number, metadata: {answer: string, answerSentiment: string, interviewee: string, mostSimiliarQuestion: string, question: string, transcriptId: string}, setView: Function }) {
  const router = useRouter()
  const pathname = usePathname()

  function viewTranscript() {
    router.push(pathname+"?tid="+metadata.transcriptId)
    return setView(2)
  }

  return (
    <div className="mt-4 border border-slate-600 rounded">
      <div className="p-4 pb-8 border-b border-slate-600">
        <p className="font-medium">{metadata.question}</p>
        <p className="mt-4">{metadata.answer}</p>
      </div>
      <div className="flex items-center p-4 justify-between text-sm">
        <Badge>{(100 * score).toFixed(0)}% Question match</Badge>
        <div className="flex items-center gap-4">
          <p>{metadata.interviewee}</p>
          <button onClick={() => viewTranscript()} type="button">
            <BlackButton>View Transcript</BlackButton>
          </button>
        </div>
      </div>
    </div>
  )
}