import { useState, useEffect } from "react"

import Prompt from "@/lib/prompt"
import { Open, Converse } from "@/utils/converse"
import { end } from "@/utils/utility"

import { motion } from "framer-motion"

import Image from "next/image"

import { useRouter } from "next/navigation"

import BlackButton from "@/components/generics/blackButton"

import { FiSend } from "react-icons/fi"

import Spinner from "@/components/generics/spinner"

import { tokens } from "@/utils/utility"

export default function FormStyle({ interviewInfo, interviewee, setMostRecentQuestion, finishedInterview, setFinishedInterview } : { interviewInfo: any, interviewee: string, setMostRecentQuestion: Function, finishedInterview: boolean, setFinishedInterview: Function }) {
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([])
  const [transcriptId, setTranscriptId] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(true)

  const [answer, setAnswer] = useState<string>("")

  const router = useRouter()

  async function setUpConversation() {  
    const opening = [
      {
        role: "system",
        content: Prompt(interviewInfo.team.interviewer, interviewInfo.team.name, interviewInfo.team.context, interviewInfo.guide, interviewInfo.purpose)
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

    setMostRecentQuestion(newtId.updatedConvo[newtId.updatedConvo.length - 1].content)

    return setLoading(false)
  }
  
  
  useEffect(() => {
    setUpConversation()

  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    setAnswer("")

    const updatedConvo = await Converse(conversation, answer, interviewee, interviewInfo.id, transcriptId, interviewInfo.guide)

    const isFinished = await end(updatedConvo[updatedConvo.length - 1].content)

    setConversation(updatedConvo)

    setMostRecentQuestion(updatedConvo[updatedConvo.length - 1].content)

    if (isFinished === "True") {
      setFinishedInterview(true)
      if (interviewInfo.rewardURL) {
        const token = await tokens(interviewInfo.team.id)
        return router.push(interviewInfo.rewardURL + "?token=" + token+ "&id=" + interviewInfo.team.id)
      }
    }

    return setLoading(false)
  }


  return (
    <div className="flex w-full justify-center px-8 sm:px-48 h-full items-center">
      <motion.div 
      className="text-left w-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-2">
          <Image
          src={interviewInfo.team.logo}
          alt="Team Logo"
          width={50}
          height={50}
          className="rounded w-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-lg sm:text-2xl font-semibold">
            {interviewInfo.team.interviewer}
          </h1>
        </div>
        <h1 className="text-xl sm:text-3xl mt-8">
          {loading ? (
            <Spinner size={30} />
          ) : (
            <>
              {conversation[conversation.length - 1].content}
            </>
          )}
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full mt-24 border-b border-slate-600 bg-transparent pb-2 text-base focus:outline-none"
          placeholder="Enter your answer..."
          disabled={finishedInterview || loading}
          required
          />
          <button className="mt-16 text-sm sm:text-lg" type="submit" disabled={finishedInterview || loading}>
            <BlackButton>
              <span className="flex items-center gap-2"><FiSend /> Continue</span>
            </BlackButton>
          </button>
        </form>
      </motion.div>
    </div>
  )
}