import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

import Link from "next/link"

export default function InterviewForm({ interviewInfo, setInterviewInfo, setView } : { interviewInfo: { name: string, purpose: string, questions: Array<string> }, setInterviewInfo: Function, setView: Function }) {

  return (
    <main>
      <h1 className="text-4xl mt-4 font-semibold">Create an Interview</h1>
      <p className="text-slate-600 mt-6 w-[90%]">Configre Ziggy to ask the questions you have and dig deeper than traditional surveys and forms.</p>
      <form className="mt-8 grid gap-12 text-sm font-medium" onSubmit={() => setView(1)}>
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
        <div>
          <label><span className="text-red-600">*</span> Purpose</label>
          <p className="text-xs text-slate-600 mt-1 font-normal">Explain what the purpose of this interview is.</p>
          <input
          type="text"
          className="w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
          placeholder="Enter your interview name..."
          maxLength={100}
          value={interviewInfo.purpose}
          onChange={(e) => setInterviewInfo({...interviewInfo, purpose: e.target.value})}
          required
          />
        </div>
        <div className="flex gap-4 items-center">
          <button type="submit">
            <BlackButton>Continue</BlackButton>
          </button>
          <Link href="/dashboard">
              <HoverWords>Cancel</HoverWords>
          </Link>
        </div>
      </form>
    </main>
  )
}