import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import Flow from "@/components/specifics/interviewComponents/duplicate/flow"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Duplicate Interview | Ziggy"
}

type Props = {
  params: { interviewid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Duplicate({ params, searchParams } : Props ) {
  const session = await getServerSession(authOptions)
  
  const interviewid = params.interviewid

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