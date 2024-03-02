import { useState, useEffect } from "react"

import Prompt from "@/lib/prompt"
import { Open, Converse } from "@/utils/converse"

import { motion } from "framer-motion"

import Image from "next/image"

import BlackButton from "@/components/generics/blackButton"

import { FiSend } from "react-icons/fi"

import Spinner from "@/components/generics/spinner"

export default function FormStyle({ interviewInfo, interviewee } : { interviewInfo: any, interviewee: string }) {
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([])
  const [transcriptId, setTranscriptId] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(true)

  const [answer, setAnswer] = useState<string>("")

  async function setUpConversation() {  
    const opening = [
      {
        role: "system",
        content: Prompt(interviewInfo.team.interviewer, interviewInfo.team.name, interviewInfo.team.purpose, interviewInfo.guide)
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

    return setLoading(false)
  }
  
  
  useEffect(() => {
    setUpConversation()

  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    const updatedConvo = await Converse(conversation, answer, interviewee, interviewInfo.id, transcriptId, interviewInfo.guide)

    setConversation(updatedConvo)

    return setLoading(false)
  }


  return (
    <div className="flex w-full px-48 h-full items-center">
      {loading ? (
        <motion.div 
        className="text-left w-full"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
          <Image
          src={interviewInfo.team.logo}
          alt="Team Logo"
          width={50}
          height={50}
          className="rounded"
          />
          <h1 className="text-2xl mt-4 font-semibold">
            {interviewInfo.team.interviewer}
          </h1>
          <div className="mt-8">
            <Spinner size={30} />
          </div>
          <div className="w-full">
            <input
            type="text"
            className="w-full mt-24 border-b border-slate-600 bg-transparent pb-2 text-base focus:outline-none"
            placeholder="Enter your answer..."
            disabled={true}
            required
            />
            <button className="mt-16 text-lg" type="submit" disabled={true}>
              <BlackButton>
                Continue
              </BlackButton>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
        className="text-left w-full"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
          <Image
          src={interviewInfo.team.logo}
          alt="Team Logo"
          width={50}
          height={50}
          className="rounded"
          />
          <h1 className="text-2xl mt-4 font-semibold">
            {interviewInfo.team.interviewer}
          </h1>
          <h1 className="text-3xl mt-8">
            {conversation[conversation.length - 1].content}
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <input
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full mt-24 border-b border-slate-600 bg-transparent pb-2 text-base focus:outline-none"
            placeholder="Enter your answer..."
            required
            />
            <button className="mt-16 text-lg" type="submit">
              <BlackButton>
                <span className="flex items-center gap-2"><FiSend /> Continue</span>
              </BlackButton>
            </button>
          </form>
        </motion.div>
      )}
    </div>
  )
}