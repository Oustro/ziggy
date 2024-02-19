
import TeamDashboard from "@/components/specifics/teamComponents/dashboard/dashboard"

import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from "@/utils/db"

export default async function Interviews(request: NextRequest & {params: { teamid: string }}) {
  const teamid = request.params.teamid

  const interviews = await prisma.interview.findMany({
    where: {
      teamId: teamid
    }
  })

  if (interviews.length === 0) {
    return redirect("/dashboard/"+teamid+"/create")
  }

  return (
    <main className="mb-16">
      <TeamDashboard />
    </main>
  )
}
