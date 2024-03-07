import { interviewSavedInfo } from "@/lib/types"

import { useState, useEffect, useRef } from "react"

import Link from "next/link"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from "@/components/generics/hoverWords"

import { IoSettingsOutline, IoFlashOutline } from "react-icons/io5"

export default function Card({ interview } : { interview: interviewSavedInfo }) {
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false)
      }

    }

    document.addEventListener("mousedown", handler)

    return () => {document.removeEventListener("mousedown", handler)}
  })

  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="border hover:border-slate-600 p-4 transition rounded shadow-sm">
        <div className="text-xs">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium truncate w-[80%]">{interview.name}</p>
            <div>
              <button onClick={() => setDropdown(prev => !prev)}>
                <BlackButton>•••</BlackButton>
              </button>
              <div className={!dropdown ? "hidden" : "" + "absolute border rounded text-sm p-2 mt-2 bg-white grid gap-3"} ref={ref}>
                <Link href={`/dashboard/${interview.teamId}/${interview.id}/edit`}>
                  <HoverWords><span className="flex items-center gap-2"><IoSettingsOutline />Settings</span></HoverWords>
                </Link>
                <Link href={`/dashboard/${interview.teamId}/${interview.id}/duplicate`}>
                  <HoverWords><span className="flex items-center gap-2"><IoFlashOutline />Duplicate interview</span></HoverWords>
                </Link>
              </div>
            </div>
          </div>
          <Link href={`/dashboard/${interview.teamId}/${interview.id}`}>
            <p className="mt-2 h-8 line-clamp text-slate-600">{interview.purpose}</p>
            <div className="flex justify-between mt-8 text-sm text-slate-600">
              <p>{interview.transcript.length} Responses</p>
              <p>{interview.guide.length} Questions</p>
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}