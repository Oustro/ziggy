"use client"

import { useEffect, useState } from "react"

import { teamSavedInfo } from "@/lib/types"

import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

import { pusherClient } from "@/utils/pusher/client"

export default function MainList({userEmail} : {userEmail: string}) {
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

  useEffect(() => {
    const channel = pusherClient.subscribe(userEmail).bind("evt::created", () => {
      fetchTeams()
    })

    return () => {
      channel.unbind();
    }

  }, [teams]);

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
        <div key={team.id} className="truncate">
          <Link href={`/dashboard/${team.id}`}>
            <HoverWords>
              <h2 className="font-medium truncate">{team.name}</h2>
            </HoverWords>
          </Link>
          <div className="truncate ml-2 mt-1">
            {team.interviews.length === 0 && 
              <Link href={`/dashboard/${team.id}/create`}>
                <HoverWords>
                  <h2 className="font-normal truncate">+ Create</h2>
                </HoverWords>
              </Link>
            }
            {team.interviews.map((interview) => (
              <Link href={`/dashboard/${team.id}/${interview.id}`} key={interview.id}>
                <HoverWords>
                  <h2 className="font-normal truncate mt-1">{interview.name}</h2>
                </HoverWords>
              </Link>
            ))}
          </div>
        </div>
      )))}
    </main>
  )
}
