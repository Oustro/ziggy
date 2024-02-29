import { interviewSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

import Image from "next/image"

import { IoPersonCircleOutline } from "react-icons/io5"


export default function Convo({ interview, tid, setTranscriptView } : { interview: interviewSavedInfo, tid: number, setTranscriptView: Function }) {

  const transcript: Array<{ role: string; content: string }> = interview.transcript[tid].convo as Array<{ role: string; content: string }>

  return (
    <div>
      <button onClick={() => setTranscriptView(0)} className="text-sm">
        <BlackButton>All transcripts</BlackButton>
      </button>
      <h1 className="text-4xl text-center font-semibold">{interview.transcript[tid].interviewee}</h1>
      <div className="mt-8 grid gap-8">
        {transcript.slice(1).map((convo, index) => (
          convo.role === "assistant" ?
            <div key={index} className="flex items-center gap-4">
              <Image
              src="/ziggy-logo.svg"
              alt="Logo"
              width={30}
              height={30}
              />
              <h2>{convo.content}</h2>
            </div>
          :
            <div key={index} className="border flex justify-end items-center rounded p-4 gap-4">
              <h2>{convo.content}</h2>
              <IoPersonCircleOutline className="text-4xl" />
            </div>
        ))}
      </div>  
    </div>
  )
}