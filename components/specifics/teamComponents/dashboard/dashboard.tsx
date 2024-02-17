"use client"

import { useState, useEffect } from "react"

import { useRouter, useParams } from "next/navigation"

import Link from "next/link"
import Image from "next/image"

import BlackButton from "@/components/generics/blackButton"
import LoadingCard from "@/components/specifics/teamComponents/cards/loadingCard"
import Card from "@/components/specifics/interviewComponents/cards/cards"

import { IoAdd } from "react-icons/io5"

import { teamSavedInfo, interviewSavedInfo } from "@/lib/types"

export default function TeamDashboard() {
  const teamid = useParams().teamid
  const router = useRouter()

  const [teamInfo, setTeamInfo] = useState<teamSavedInfo>()
  const [interviews, setInterviews] = useState<Array<interviewSavedInfo>>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  async function fetchInterviews() {
    const responseInterviewsGet = await fetch("/api/interviews/get?id=" + teamid)

    if (responseInterviewsGet.status === 207) {
      return router.push("/dashboard/"+teamid+"/create")
    }

    const data = await responseInterviewsGet.json()

    setTeamInfo(data.team)
    setInterviews(data.interviews)
    setLoading(false)
  }

  useEffect(() => {
    fetchInterviews()
    
  }, [])

  return (
    <main className="px-12">
      <div className="flex items-center justify-between mt-6">
        {loading ? 
          <h1 className="text-4xl font-semibold animate-pulse w-64 rounded h-8 bg-slate-200"></h1>
        :
          <div className="flex items-center gap-3">
            <Image
            src={teamInfo?.logo || ""}
            alt="Team Logo"
            width={40}
            height={40}
            className="rounded w-[40px] h-[40px]"
            />
            <h1>/</h1>
            <h1 className="text-3xl font-semibold">Interviews</h1>
          </div>
        }
        <div className="flex items-center gap-6 text-sm">
          <Link href={`/dashboard/${teamid}/create`} className="flex items-center gap-2">
            <BlackButton><span className="flex items-center gap-1"><IoAdd /> Create Interview</span></BlackButton>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {loading ? (
          new Array(3)).fill(0).map((_, i) => 
          <LoadingCard key={i} />
        ) : (interviews.map((team) => (
          <Card key={team.id} interview={team} />
        )))}
      </div>
    </main>
  )
}