"use client"

import { useEffect, useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

import { Reorder } from "framer-motion"

import { useRouter } from "next/navigation"

import { MdCancel, MdDragIndicator } from "react-icons/md"

import Link from "next/link"

import DeleteConfirmation from "./deleteConfirmation"

export default function Flow({ interview } : { interview: any }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [interviewInfo, setInterviewInfo] = useState({
    name: interview.name,
    purpose: interview.purpose,
    collect: interview.collect,
  })

  const [error, setError] = useState<string>("")

  const [questions, setQuestions] = useState<string>("")
  const [questionList, setQuestionList] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    let currQuestions = []
    for (let i = 0; i < interview.guide.length; ++i) {
      currQuestions.push(interview.guide[i].question)
    }

    setQuestionList(currQuestions)

  }, [])

  function addQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setQuestionList([...questionList, questions])
    return setQuestions("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    setError("")
    setLoading(true)

    if (questionList.length === 0) {
      setError("Please add at least one question.")
      return setLoading(false)
    }

    if (interviewInfo.name === "" || interviewInfo.purpose === "") {
      setError("Please fill out all fields.")
      return setLoading(false)
    }

    const responseInterviewCreate = await fetch("/api/interviews/update", {
      method: "PUT",
      body: JSON.stringify({
        name: interviewInfo.name,
        purpose: interviewInfo.purpose,
        collect: interviewInfo.collect,
        questions: questionList,
        interviewid: interview.id
      })
    })

    if (!responseInterviewCreate.ok) {
      setLoading(false)
      return setError("An error occurred. Please try again later.")
    }

    return router.push("/dashboard/"+interview.team.id+"/"+interview.id)
  }


  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Settings</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Configre Ziggy to ask the questions you have and dig deeper than traditional surveys and forms.</p>
      <p className="mt-8 pb-2 border-b text-xl font-semibold">Interview Settings</p>
      <div className="grid gap-12 mt-4 text-sm font-medium">
        <div>
          <label><span className="text-red-600">*</span> Interview name</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">This is the name of your interview. It will be visible to both the public and your team.</p>
          <input
          type="text"
          className="w-full sm:w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your interview name..."
          maxLength={40}
          value={interviewInfo.name}
          disabled={loading}
          onChange={(e) => setInterviewInfo({...interviewInfo, name: e.target.value})}
          required
          />
        </div>
        <div>
          <label><span className="text-red-600">*</span> Purpose</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">Explain what the purpose of this interview is.</p>
          <input
          type="text"
          className="w-full sm:w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your interview purpose..."
          maxLength={100}
          disabled={loading}
          value={interviewInfo.purpose}
          onChange={(e) => setInterviewInfo({...interviewInfo, purpose: e.target.value})}
          required
          />
        </div>
        <form onSubmit={addQuestion}>
          <label><span className="text-red-600">*</span> Interview questions</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">These are the questions your going to be asked in your interview.</p>
          <div className="flex gap-4 items-end">
            <input
            type="text"
            className="w-full sm:w-[60%] mt-8 border-b border-slate-600 pb-2 text-base focus:outline-none"
            placeholder="Enter your questions..."
            value={questions}
            disabled={loading}
            onChange={(e) => setQuestions(e.target.value)}
            required
            />
            <button type="submit" disabled={loading}>
              <BlackButton>Add</BlackButton>
            </button>
          </div>
        </form>
        <div>
          <p>Current questions</p>
          <p className="pb-2 border-b text-xs text-slate-600 mt-1 font-normal mb-4 sm:w-[60%]">These are the questions currently configured for this interview, questions are asked first while questions at the bottom are asked last.</p>
          {questionList.length === 0 && <p>No questions added yet.</p>}
          <Reorder.Group axis="y" values={questionList} onReorder={setQuestionList} className="grid gap-4 sm:w-[60%]">
            {questionList.map((question, index) => (
              <Reorder.Item key={question} value={question} className="flex justify-between">
                <div className="flex flex-grow gap-2 items-center pr-4">
                  <MdDragIndicator className="cursor-ns-resize min-w-4"/>
                  <p className="font-normal">{index === 0 && <span className="font-medium rounded-full border border-slate-600 px-2 text-xs">Top priority</span>} {question}</p>
                </div>
                <button onClick={() => setQuestionList(questionList.filter((_, i) => i !== index))}><HoverWords><MdCancel /></HoverWords></button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div>
          <label><span className="text-red-600">*</span> Collect partcipant information</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">You can collect the emails of partcipants of this interview.</p>
          <div className="flex items-center gap-2 mt-4">
          <input 
          type="checkbox" 
          id="collect" 
          onChange={() => setInterviewInfo({...interviewInfo, collect: !interviewInfo.collect})} 
          checked={interviewInfo.collect} 
          />
          <label className="font-normal text-sm">Yes, I would like to collect partcipant emails.</label>
          </div>
        </div>
        <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
          <button disabled={loading} type="submit">
            <BlackButton>Save changes</BlackButton>
          </button>
          <Link href={'/dashboard/'+interview.team.id+'/'+interview.id}>
            <HoverWords>Cancel</HoverWords>
          </Link>
        </form>
        <p className="text-sm text-red-500">{error}</p>
      </div>
      <div>
        <p className="mt-8 pb-2 border-b text-xl font-semibold">Danger Zone</p>
        <p className="mt-4 font-medium text-sm">Delete this interview</p>
        <p className="text-xs text-slate-600 mt-1 font-normal">This action cannot be undone.</p>
        <button className="bg-red-400 rounded text-sm mt-6">
          <DeleteConfirmation teamid={interview.team.id} interviewid={interview.id}>
            <BlackButton>Delete this interview</BlackButton>
          </DeleteConfirmation>
        </button>
      </div>
    </main>
  )
}