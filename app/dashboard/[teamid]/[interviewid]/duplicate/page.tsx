import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import Flow from "@/components/specifics/interviewComponents/duplicate/flow"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Duplicate Interview | Ziggy",
  description: "The AI tool to conduct interviews and get better feedback than traditional survey forms.",
}

export default async function Duplicate(request: NextRequest & {params: { interviewid: string }}) {
  const session = await getServerSession(authOptions)
  
  const interviewid = request.params.interviewid

  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewid || "",
      team: {
        members: {
          some: {
            email: session?.user?.email
          }
        }
      }
    },
    include: {
      guide: true,
      team: true
    }
  })

  const team = await prisma.team.findUnique({
    where: {
      id: interview?.teamId || ""
    },
    include: {
      interviews: true
    }
  })

  if (interview?.team.plan === 0) {
    if ((team?.interviews?.length ?? 3) >= 3) {
      return redirect("/dashboard/"+interview?.teamId+"/sorry")
    }
  }

  return (
    <main className='p-12'>
      <Flow interview={interview} />
    </main>
  )
}