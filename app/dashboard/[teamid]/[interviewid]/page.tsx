import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import Flow from '@/components/specifics/interviewComponents/dashboard/flow'

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
      team: true,
      transcript: true,
      guide: true
    }
  })

  if (!interview) {
    return redirect("/dashboard")
  }

  return (
    <main>
      <div className="h-96 bg-blue-500">
        <Flow>hi</Flow>
      </div>
      <div className="h-96 bg-blue-500">
        <h1>Interview Page</h1>
      </div>
      <div className="h-96 bg-blue-500">
        <h1>Interview Page</h1>
      </div>
    </main>
  )
}
