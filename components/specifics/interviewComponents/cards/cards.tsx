import { interviewSavedInfo } from "@/lib/types"

import Link from "next/link"

export default function Card({ interview } : { interview: interviewSavedInfo }) {

  return (
    <>
      <Link href={`/dashboard/${interview.teamId}/${interview.id}`}>
        <div className="border hover:border-slate-600 p-4 transition rounded shadow-sm">
          <div className="text-xs">
            <p className="text-xl font-medium">{interview.name}</p>
            <p className="mt-2 h-8 line-clamp">{interview.purpose}</p>
            <div className="flex justify-between mt-8 text-sm">
              <p>{interview.transcript.length} Responses</p>
              <p>{interview.guide.length} Questions</p>
            </div>
          </div>
        </div>
      </Link>
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