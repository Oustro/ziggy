import { useState, useEffect } from "react"

import { useSearchParams, useRouter } from "next/navigation"

export default function Ask({ interviewid } : { interviewid: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [question, setQuestion] = useState("")

  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<Array<{score: number, metadata: {answer: string, answerSentiment: string, interviwee: string, mostSimiliarQuestion: string, question: string}}>>([])

  async function askZiggy(e: React.FormEvent<HTMLFormElement>) {
    // Fetch the answer from Ziggy
    e.preventDefault()

  }

  async function askZiggyQuick(query: string) {
    // Fetch the answer from Ziggy
    setLoading(true)
    const responseAnalyticsAsk = await fetch('/api/analytics/ask?id='+interviewid+'&q='+query)

    if (!responseAnalyticsAsk.ok) {
      return setAnswer("Error fetching data")
    }

    const data = await responseAnalyticsAsk.json()

    console.log(data)

    setAnswer(data.answer)
    setSource(data.source)
    router.push(window.location.pathname)

    return setLoading(false)
  }

  useEffect(() => {
    if (searchParams.get("q")) {
      setQuestion(searchParams.get("q") || "")
      askZiggyQuick(searchParams.get("q") || "")
    }

  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Ask Ziggy</h1>
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
        <div key={i} className="mt-4">
          <p>{(100 * s.score).toFixed(0)}% Similiarity</p>
          <p>{s.metadata.answer}</p>
        </div>
      ))}
    </div>
  )
}