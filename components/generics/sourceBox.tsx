import Badge from "@/components/generics/badge"

export default function SourceBox({ score, metadata } : { score: number, metadata: {answer: string, answerSentiment: string, interviewee: string, mostSimiliarQuestion: string, question: string} }) {
  return (
    <div className="mt-4 border border-slate-600 rounded">
      <div className="p-4 border-b border-slate-600">
        <p className="font-medium">{metadata.question}</p>
        <p className="mt-4">{metadata.answer}</p>
      </div>
      <div className="flex items-center p-4 justify-between text-sm">
        <Badge>{(100 * score).toFixed(0)}% Match</Badge>
        <p>{metadata.interviewee}</p>
      </div>
    </div>
  )
}