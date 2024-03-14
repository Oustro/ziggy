import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import InterviewDashboard from '@/components/specifics/interviewComponents/dashboard/dashboard'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { interviewid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.interviewid

  const interview = await prisma.interview.findUnique({
    where: {
      id: id
    },
    include: {
      team: true
    }
  })
  
  return {
    title: interview?.team.name + " - " + interview?.name + " | Ziggy" || "Your team | Ziggy",
  }
}

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
      transcript: {
        orderBy: {
          conducted: "desc"
        }
      }
    }
  })

  if (!interview) {
    return redirect("/dashboard")
  }

  let checkReponseView = 0
  if (interview.transcript.length === 0) {
    checkReponseView = 3
  }

  return (
    <main className="mb-16">
      <InterviewDashboard interview={interview} checkReponseView={checkReponseView} />
    </main>
  )
}
