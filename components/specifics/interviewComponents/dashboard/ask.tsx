import { useState, useEffect } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import SourceBox from "@/components/generics/sourceBox"

export default function Ask({ interviewid } : { interviewid: string }) {
  const searchParams = useSearchParams()
  const quickAsk = searchParams.get("q")
  const router = useRouter()
  const pathname = usePathname()

  const [question, setQuestion] = useState("")

  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<Array<{score: number, metadata: {answer: string, answerSentiment: string, interviewee: string, mostSimiliarQuestion: string, question: string}}>>([])

  async function askZiggy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const responseAnalyticsAsk = await fetch('/api/analytics/ask?id='+interviewid+'&q='+question)

    if (!responseAnalyticsAsk.ok) {
      return setAnswer("Error fetching data")
    }

    const data = await responseAnalyticsAsk.json()

    setAnswer(data.answer)
    setSource(data.source)
    return setLoading(false)
  }

  async function askZiggyQuick(query: string) {
    setLoading(true)
    setQuestion(query)
    const responseAnalyticsAsk = await fetch('/api/analytics/ask?id='+interviewid+'&q='+query)

    if (!responseAnalyticsAsk.ok) {
      return setAnswer("Error fetching data")
    }

    const data = await responseAnalyticsAsk.json()

    setAnswer(data.answer)
    setSource(data.source)
    router.push(pathname)

    return setLoading(false)
  }

  useEffect(() => {
    if (quickAsk) {
      askZiggyQuick(quickAsk)
    }

  }, [quickAsk])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Results</h1>
      <p className="mt-2">Ziggy has collected data from your interviewees and is ready to answer any questions you may have.</p>
      <form className="mt-8 w-full" onSubmit={askZiggy}>
        <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
        placeholder="Enter a question about your interview for Ziggy..."
        required
        />
      </form>

      {answer}

      {source.map((s, i) => (
        <SourceBox key={i} score={s.score} metadata={s.metadata} />
      ))}
    </div>
  )
}