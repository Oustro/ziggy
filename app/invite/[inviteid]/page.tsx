import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import { Redis } from '@upstash/redis'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import prisma from '@/utils/db'

export default async function Invite(request: NextRequest & {params: { inviteid: string }}) {  
  const session = await getServerSession(authOptions)

  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const inviteData = await redis.get(request.params.inviteid) as {teamID: string, invitee: string}

  if (!inviteData) {
    return redirect("/invite/sorry?errortype=1")
  }

  const team = await prisma.team.findUnique({
    where: {
      id: inviteData.teamID
    },
    include: {
      members: true
    }
  })

  if (team?.plan === 0) {
    return redirect("/invite/sorry?errortype=2")
  }
  else if (team?.plan === 1 && team?.members.length >= 5) {
    return redirect("/invite/sorry?errortype=2")
  }
  else if (team?.plan === 2 && team?.members.length >= 10) {
    return redirect("/invite/sorry?errortype=2")
  }

  if (session) {
    if (inviteData.invitee) {
      if (session.email === inviteData.invitee) {
        const user = await prisma.userInfo.findUnique({
          where: {
            email: inviteData.invitee
          }
        })

        if (!user) {
          return redirect("/register/login")
        }

        await prisma.team.update({
          where: {
            id: inviteData.teamID
          },
          data: {
            members: {
              connect: {
                id: user.id
              }
            }
          }
        })
      }

      return redirect("/dashboard")
    }
    else {
      const user = await prisma.userInfo.findUnique({
        where: {
          email: session.email || ""
        }
      })

      if (!user) {
        return redirect("/register/login")
      }

      await prisma.team.update({
        where: {
          id: inviteData.teamID
        },
        data: {
          members: {
            connect: {
              id: user.id
            }
          }
        }
      })

      return redirect("/dashboard")
    }
  }
  else {
    return redirect("/register/login")
  }
}
