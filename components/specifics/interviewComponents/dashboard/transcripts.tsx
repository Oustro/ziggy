import { interviewSavedInfo, transcript } from "@/lib/types"

import Badge from "@/components/generics/badge"

export default function Transcripts({ interview } : { interview: interviewSavedInfo }) {

  return (
    <div>
      <h1 className="text-4xl font-semibold">Transcripts</h1>
      <div className="mt-4">
        {interview.transcript.map((transcript, index) => (
          <button className="border rounded p-4 mt-4 hover:border-slate-600 transition-all w-full text-left" key={index}>
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
            <h2 className="text-2xl font-semibold mt-4">{transcript.interviewee}</h2>
            <p className="mt-2">{transcript.conducted.toLocaleDateString()}</p>
          </button>
        ))}
      </div>
    </div>
  )
}