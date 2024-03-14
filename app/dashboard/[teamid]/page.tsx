
import TeamDashboard from "@/components/specifics/teamComponents/dashboard/dashboard"

import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from "@/utils/db"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { teamid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.teamid

  const team = await prisma.team.findUnique({
    where: {
      id: id
    }
  })
  
  return {
    title: team?.name + " | Ziggy" || "Your team | Ziggy",
  }
}

export default async function Interviews(request: NextRequest & {params: { teamid: string }}) {
  const session = await getServerSession(authOptions)
  const teamid = request.params.teamid

  const interviews = await prisma.interview.findMany({
    where: {
      teamId: teamid,
      team: {
        members: {
          some: {
            email: session?.email
          }
        }
      }
    }
  })

  if (interviews.length === 0 || !interviews) {
    return redirect("/dashboard/"+teamid+"/create")
  }

  return (
    <main className="mb-16">
      <TeamDashboard />
    </main>
  )
}
