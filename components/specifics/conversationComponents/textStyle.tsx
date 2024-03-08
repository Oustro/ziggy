import { useState, useEffect, useRef } from "react"

import Prompt from "@/lib/prompt"
import { Open, Converse } from "@/utils/converse"
import { end } from "@/utils/utility"

import Image from "next/image"

import BlackButton from "@/components/generics/blackButton"

import { FiSend } from "react-icons/fi"
import { IoPersonCircleOutline } from "react-icons/io5"

import Spinner from "@/components/generics/spinner"

export default function TextStyle({ interviewInfo, interviewee, setMostRecentQuestion, finishedInterview, setFinishedInterview } : { interviewInfo: any, interviewee: string, setMostRecentQuestion: Function, finishedInterview: boolean, setFinishedInterview: Function }) {
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([])
  const [chatLog, setChatLog] = useState<Array<{role: string, content: string}>>([])
  const [transcriptId, setTranscriptId] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(true)

  const [answer, setAnswer] = useState<string>("")

  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function setUpConversation() {  
    const opening = [
      {
        role: "system",
        content: Prompt(interviewInfo.team.interviewer, interviewInfo.team.name, interviewInfo.team.purpose, interviewInfo.guide, interviewInfo.purpose)
      },
      {
        role: "assistant",
        content: "Hi I'm, " + interviewInfo.team.interviewer + ", an AI model created by Ziggy used to gather feedback for the " + interviewInfo.team.name + " team. Are you ready to get started?"
      },
      {
        role: "user",
        content: "I am, let's start."
      }
    ]

    const newtId = await Open(opening, interviewee, interviewInfo.id, interviewInfo.team.stripeID, interviewInfo.team.logo)

    setTranscriptId(newtId.tid)

    setConversation(newtId.updatedConvo)

    setChatLog(newtId.updatedConvo)

    setMostRecentQuestion(newtId.updatedConvo[newtId.updatedConvo.length - 1].content)

    return setLoading(false)
  }
  
  
  useEffect(() => {
    setUpConversation()

  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTo(0, scrollHeight - clientHeight)
    }
  }, [chatLog])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    setChatLog([...chatLog, {role: "user", content: answer}])

    setAnswer("")

    const updatedConvo = await Converse(conversation, answer, interviewee, interviewInfo.id, transcriptId, interviewInfo.guide)

    const isFinished = await end(updatedConvo[updatedConvo.length - 1].content)

    setConversation(updatedConvo)
    
    setChatLog(updatedConvo)

    setMostRecentQuestion(updatedConvo[updatedConvo.length - 1].content)

    if (isFinished === "True") {
      setFinishedInterview(true)
    }

    return setLoading(false)
  }


  return (
    <div className="w-full h-full items-center">
      <div className="px-16 h-[75%] overflow-scroll py-8" ref={chatContainerRef} style={{ scrollBehavior: 'smooth' }}>
        {chatLog.slice(3).map((convo, index) => (
          convo.role === "assistant" ?
            <div key={index} className="flex items-center mt-4 gap-4 border bg-slate-200 border-slate-600 rounded p-4">
              <Image
              src={interviewInfo.team.logo}
              alt="Logo"
              width={30}
              height={30}
              />
              <h2>{convo.content}</h2>
            </div>
          :
            <div key={index} className="border flex mt-4 justify-end items-center border-slate-600 rounded p-4 gap-4">
              <h2>{convo.content}</h2>
              <IoPersonCircleOutline className="text-4xl" />
            </div>
        ))}
        {loading && (
           <div  className="flex items-center mt-4 gap-4 border bg-slate-200 border-slate-600 rounded p-4">
            <Image
            src={interviewInfo.team.logo}
            alt="Logo"
            width={30}
            height={30}
            />
            <Spinner size={25} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full absolute bottom-0 pt-4 px-16">
        <div className="flex items-center mb-36 gap-4">
          <input
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          className="w-full border-b border-slate-600 bg-transparent pb-2 text-base focus:outline-none"
          placeholder="Enter your answer..."
          disabled={finishedInterview}
          required
          >
          </input>
          <button className="text-sm" type="submit" disabled={finishedInterview}>
            <BlackButton>
              <span className="flex items-center gap-2"><FiSend /> Continue</span>
            </BlackButton>
          </button>
        </div>
      </form>
    </div>
  )
}