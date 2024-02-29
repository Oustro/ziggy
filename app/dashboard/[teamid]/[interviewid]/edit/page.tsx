import { NextRequest } from 'next/server'

import prisma from '@/utils/db'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import Flow from "@/components/specifics/interviewComponents/dashboard/edit/flow"

export default async function Edit(request: NextRequest & {params: { interviewid: string }}) {
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

  return (
    <main className='p-12'>
      <Flow interview={interview} />
    </main>
  )
}