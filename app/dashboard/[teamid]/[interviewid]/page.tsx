import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import InterviewDashboard from '@/components/specifics/interviewComponents/dashboard/dashboard'

export default async function InterviewPage(request: NextRequest & {params: { interviewid: string }}) {
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
      transcript: true
    }
  })

  if (!interview) {
    return redirect("/dashboard")
  }

  return (
    <main>
      <InterviewDashboard interview={interview} />
    </main>
  )
}
