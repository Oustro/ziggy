"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

import { useRouter, useParams } from "next/navigation"

import { MdCancel } from "react-icons/md"

export default function CreateQuestions({ interviewInfo, setInterviewInfo, setView } : { interviewInfo: { name: string, purpose: string, collect: boolean, questions: Array<string> }, setInterviewInfo: Function, setView: Function }) {
  const [questions, setQuestions] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const router = useRouter()
  const teamid = useParams().teamid

  function addQuestion(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInterviewInfo({...interviewInfo, questions: [...interviewInfo.questions, questions]})
    setQuestions("")
  }

  function removeQuestion(index : number) {
    return function() {
      setInterviewInfo({...interviewInfo, questions: interviewInfo.questions.filter((_, i) => i !== index)})
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError("")

    if (interviewInfo.questions.length === 0) {
      setLoading(false)
      return setError("Please add at least one question.")
    }

    const responseInterviewCreate = await fetch("/api/interviews/create", {
      method: "POST",
      body: JSON.stringify({
        name: interviewInfo.name,
        purpose: interviewInfo.purpose,
        collect: interviewInfo.collect,
        questions: interviewInfo.questions,
        teamid: teamid
      })
    })

    if (!responseInterviewCreate.ok) {
      setLoading(false)
      return setError("An error occurred. Please try again later.")
    }

    setLoading(false)
    return router.push("/dashboard/"+teamid)
  }

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Add questions to {interviewInfo.name}</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Add the questions you would like Ziggy to ask.</p>
      <div className="mt-8 grid gap-8 text-sm font-medium">
        <form onSubmit={addQuestion}>
          <label><span className="text-red-600">*</span> Questions</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">This is the name of your interview. It will be visible to both the public and your team.</p>
          <div className="flex gap-4 items-end">
            <input
            type="text"
            className="w-[40%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
            placeholder="Enter your questions..."
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            required
            />
            <button type="submit">
              <BlackButton>Add</BlackButton>
            </button>
          </div>
        </form>
        <div>
          <p className="text-base">Current questions</p>
          <div className="mt-4 text-sm">
            {interviewInfo.questions.length === 0 && <p className="text-slate-600 font-normal">No required questions added yet.</p>}
            {interviewInfo.questions.map((question, index) => (
              <div key={index} className="flex group items-center w-96 gap-2 mb-3 font-normal" onClick={removeQuestion(index)}>
                <button type="button" className="border p-2 w-96 rounded border-slate-600 group-hover:border-red-500 text-left transition-all">
                  <p>{question}</p>
                </button>
                <MdCancel className="cursor-pointer hidden text-xl group-hover:block text-red-500" />
              </div>
            ))}
          </div>
        </div>
        <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
          <button disabled={loading} type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
          <button type="button" disabled={loading} onClick={() => setView(0)}>
            <HoverWords>Back</HoverWords>
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-red-500">{error}</p>
    </main>
  )
}