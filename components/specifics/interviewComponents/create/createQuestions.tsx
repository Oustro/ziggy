"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

export default function CreateQuestions({ interviewInfo, setInterviewInfo, setView } : { interviewInfo: { name: string, purpose: string, questions: Array<string> }, setInterviewInfo: Function, setView: Function }) {
  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Add questions</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Add the general questions you would like Ziggy to ask.</p>
      <div className="mt-8 grid gap-12 text-sm font-medium">
        <div>
          <label><span className="text-red-600">*</span> Interview name</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">This is the name of your interview. It will be visible to both the public and your team.</p>
          <input
          type="text"
          className="w-96 mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your interview name..."
          maxLength={40}
          value={interviewInfo.name}
          onChange={(e) => setInterviewInfo({...interviewInfo, name: e.target.value})}
          required
          />
        </div>
        <div className="flex gap-4 items-center">
          <button type="button" onClick={() => setView(0)}>
            <HoverWords>Back</HoverWords>
          </button>
          <button>
            <BlackButton>Create Interview</BlackButton>
          </button>
        </div>
      </div>
    </main>
  )
}