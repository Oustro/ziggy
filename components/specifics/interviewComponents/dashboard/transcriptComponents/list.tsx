import BlackButton from "@/components/generics/blackButton"
import { interviewSavedInfo } from "@/lib/types"

import { useEffect } from "react"

import TranscriptsSetting from "@/components/specifics/settingComponents/transcriptSettings"

export default function List({ interview, setTid } : { interview: interviewSavedInfo, setTid: Function }) {

  useEffect(() => {
    setTid(-1)
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-semibold">Transcripts</h1>
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        {interview.transcript.map((transcript, index) => (
          <div className="border rounded p-4 hover:border-slate-600 transition-all w-full text-left" key={index}>
            <div className="flex justify-between items-center text-xs">
              <div>
                <h2 className="text-2xl font-semibold truncate">{transcript.name}</h2>
              </div>
              <TranscriptsSetting interview={interview} tid={index}>
                <BlackButton>•••</BlackButton>
              </TranscriptsSetting>
            </div>
            <button className="w-full text-left" onClick={() => setTid(index)}>
              <p className="text-sm text-slate-600 mt-2">{transcript.interviewee}</p>
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
          </div>
        ))}
      </div>
    </div>
  )
}