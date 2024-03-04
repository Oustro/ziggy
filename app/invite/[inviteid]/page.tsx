import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

import { Redis } from '@upstash/redis'

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

export default async function Invite(request: NextRequest & {params: { inviteid: string }}) {  
  // user is logged in
  const session = await getServerSession(authOptions)


  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  })

  const inviteData = await redis.get(request.params.inviteid) as {teamID: string, invitee: string}

  if (!inviteData) {
    return redirect("/invite/sorry")
  }

  console.log(inviteData)

  if (session) {
    if (inviteData.invitee) {
      if (session.email === inviteData.invitee) {
        // add to team
        return redirect("/dashboard")
      }
    }
    else {
      // add to team
      return redirect("/dashboard")
    }
  }
  else {
    return redirect("/register/login")
  }
}
