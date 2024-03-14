import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import Flow from "@/components/specifics/interviewComponents/create/flow"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Interview | Ziggy",
  description: "The AI tool to conduct interviews and get better feedback than traditional survey forms.",
}

export default async function CreateInterview(request: NextRequest & {params: { teamid: string }}) {

  const teamid = request.params.teamid

  const team = await prisma.team.findUnique({
    where: {
      id: teamid
    },
    include: {
      interviews: true
    }
  })

  if (!team) {
    return redirect("/dashboard")
  }

  if (team.plan === 0) {
    if (team.interviews.length >= 3) {
      return redirect("/dashboard/"+teamid+"/sorry")
    }
  }

  return (
    <main>
      <div className="p-12">
        <Flow teamid={teamid} />
      </div>
    </main>
  )
}
