"use client"

import { useEffect, useState } from "react"

import { teamSavedInfo } from "@/lib/types"

import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"

import { IoAdd } from "react-icons/io5"

export default function MainList() {
  const [teams, setTeams] = useState([] as teamSavedInfo[])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)
  
  async function fetchTeams() {
    const responseTeamsGet = await fetch("/api/teams/get")

    if (responseTeamsGet.status === 207) {
      setEmpty(true)
      return setLoading(false)
    }

    const data = await responseTeamsGet.json()
    setTeams(data.teams)
    setLoading(false)
  }

  useEffect(() => {
    fetchTeams()

  }, [])

  return (
    <main className="grid gap-3 text-sm">
      {loading ? (
        new Array(10)).fill(0).map((_, index) => 
        <p key={index} className="w-full bg-slate-200 h-5 rounded animate-pulse"></p>
      ) : empty ? ( 
        <Link href="/dashboard/create" className="mt-4">
          <BlackButton>
            <p className="text-center">Create a team</p>
          </BlackButton>
        </Link>
      ) : (teams.map((team) => (
        <div key={team.id} className="truncate w-full">
          <Link href={`/dashboard/${team.id}`}>
            <HoverWords>
              <p className="truncate font-medium flex items-center gap-1"><IoIosArrowDown />{team.name}</p>
            </HoverWords>
          </Link>
          <main className="truncate w-full">
            {team.interviews.length === 0 && 
              <Link href={`/dashboard/${team.id}/create`}>
                <HoverWords>
                  <p className="truncate flex ml-4 mt-1 flex items-center gap-1"><IoAdd />Create interview</p>
                </HoverWords>
              </Link>
            }
            {team.interviews.map((interview) => (
              <Link href={`/dashboard/${team.id}/${interview.id}`} key={interview.id}>
                <HoverWords>
                  <p className="truncate flex ml-4 mt-1 flex items-center gap-1"><IoIosArrowForward />{interview.name}</p>
                </HoverWords>
              </Link>
            ))}
          </main>
        </div>
      )))}
    </main>
  )
}
