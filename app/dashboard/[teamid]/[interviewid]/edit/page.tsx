import { NextRequest } from 'next/server'

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import Flow from "@/components/specifics/interviewComponents/edit/flow"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interview Settings | Ziggy",
}

type Props = {
  params: { interviewid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Edit({ params, searchParams } : Props ) {
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

  return (
    <main className='p-12'>
      <Flow interview={interview} />
    </main>
  )
}