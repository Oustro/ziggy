import { interviewSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

import Image from "next/image"

import { IoPersonCircleOutline } from "react-icons/io5"

import { FaRegClock } from "react-icons/fa6"

export default function Convo({ interview, tid, setTranscriptView } : { interview: interviewSavedInfo, tid: number, setTranscriptView: Function }) {

  const transcript: Array<{ role: string; content: string }> = interview.transcript[tid].convo as Array<{ role: string; content: string }>

  return (
    <div>
      <div className="flex justify-between items-center">
        <button onClick={() => setTranscriptView(0)} className="text-sm">
          <BlackButton>All transcripts</BlackButton>
        </button>
        <p className="font-medium flex items-center gap-1"><FaRegClock /> Conducted: {interview.transcript[tid].conducted.toLocaleDateString()}</p>
      </div>
      <h1 className="text-4xl text-center font-semibold">{interview.transcript[tid].interviewee}</h1>
      <div className="mt-8 grid gap-8">
        {transcript.slice(1).map((convo, index) => (
          convo.role === "assistant" ?
            <div key={index} className="flex items-center gap-4 border bg-slate-200 border-slate-600 rounded p-4">
              <Image
              src="/ziggy-logo.svg"
              alt="Logo"
              width={30}
              height={30}
              />
              <h2>{convo.content}</h2>
            </div>
          :
            <div key={index} className="border flex justify-end items-center border-slate-600 rounded p-4 gap-4">
              <h2>{convo.content}</h2>
              <IoPersonCircleOutline className="text-4xl" />
            </div>
        ))}
      </div>  
    </div>
  )
}