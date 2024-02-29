import { interviewSavedInfo } from "@/lib/types"

import { use, useEffect } from "react"

export default function List({ interview, setTid } : { interview: interviewSavedInfo, setTid: Function }) {

  useEffect(() => {
    setTid(-1)
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Transcripts</h1>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {interview.transcript.map((transcript, index) => (
          <button className="border rounded p-4 hover:border-slate-600 transition-all w-full text-left" key={index} onClick={() => setTid(index)}>
            <h2 className="text-2xl font-semibold">{transcript.interviewee}</h2>
            <div className="flex justify-between items-center mt-4">
              <p className="mt-2">{transcript.conducted.toLocaleDateString()}</p>
              {transcript.sentiment > 0 ? (
                <div className="rounded-full px-2 border text-center text-sm border-green-500 bg-green-200 inline-block">
                  <p>Positive</p>
                </div>
              ) : transcript.sentiment < 0 ? (
                <div className="rounded-full px-2 border text-center text-sm border-red-400 bg-red-200 inline-block">
                  <p>Negative</p>
                </div>
              ) : (
                <div className="rounded-full px-2 border text-center text-sm bg-slate-200 border-slate-600 inline-block">
                  <p>Neutral</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}