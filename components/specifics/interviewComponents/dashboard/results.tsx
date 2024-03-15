import { useState, useEffect } from "react"

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import SourceBox from "@/components/generics/sourceBox"
import Spinner from "@/components/generics/spinner"
import BlackButton from "@/components/generics/blackButton"

import { FaMagnifyingGlass } from "react-icons/fa6"

import Image from "next/image"

export default function Results({ interviewid, setView } : { interviewid: string, setView: Function }) {
  const searchParams = useSearchParams()
  const quickAsk = searchParams.get("q")
  const router = useRouter()
  const pathname = usePathname()

  const [question, setQuestion] = useState("")

  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<Array<{score: number, metadata: {answer: string, answerSentiment: string, interviewee: string, mostSimiliarQuestion: string, question: string, transcriptId: string}}>>([])

  async function askZiggy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const responseAnalyticsAsk = await fetch('/api/analytics/results?id='+interviewid+'&q='+question)

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
    const responseAnalyticsAsk = await fetch('/api/analytics/results?id='+interviewid+'&q='+query)

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
      <div className="mt-8 relative">
        <form onSubmit={askZiggy} className="sm:flex gap-4">
          <input
          type="text"
          placeholder="Ask a question about your interview and get an AI summary, answer, and resources"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="pl-10 mt-4 w-full border-b border-slate-600 pb-2 text-base focus:outline-none"
          />
          <FaMagnifyingGlass className="absolute left-2 top-5" />
          <button
          type="submit"
          disabled={loading}
          className="mt-2 sm:w-[10%] w-full"
          >
            <BlackButton>Search</BlackButton>
          </button>
        </form>
      </div>
      <div className="mt-8">
        {loading && (
          <div className="flex items-center gap-4 border p-4 rounded border-slate-600">
            <Image
            src="/ziggy-logo.svg"
            alt="Logo"
            width={40}
            height={40}
            />
            <div className="w-full">
              <Spinner size={24}/>
            </div>
          </div>
        )}
        {answer && !loading && (
          <>
            <div className="flex items-center gap-4 border p-4 rounded border-slate-600">
              <Image
              src="/ziggy-logo.svg"
              alt="Logo"
              width={40}
              height={40}
              />
              <div className="w-full">
                <p>{answer}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg font-medium">Real responses from interviewees:</p>
              <div className="mt-4">
                {source.map((s, i) => (
                  <SourceBox key={i} score={s.score} metadata={s.metadata} setView={setView} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}