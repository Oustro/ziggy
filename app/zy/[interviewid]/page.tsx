import Flow from "@/components/specifics/conversationComponents/flow"

import { NextRequest } from 'next/server'
import { redirect } from "next/navigation"

export default async function ConvoPage(request: NextRequest & {params: { interviewid: string }}) {   
  const externalId = request.params.interviewid

  const responseInterviewGet = await fetch(process.env.MODE_URL+"/api/conversation/get?id=" + externalId, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (responseInterviewGet.status === 404) {
    return redirect("/")
  }


  const data = await responseInterviewGet.json()

  if (data.interview.team.plan === 0) {
    // ** Change > 2 back to > 25 
    if (data.interview.transcript.length > 2) {
      return redirect("/zy/sorry")
    }
  }
  else if (data.interview.team.plan === 1) { 
    if (data.interview.transcript.length > 75) {
      return redirect("/zy/sorry")
    }
  }
  else if (data.interview.team.plan === 2) { 
    if (data.interview.transcript.length > 150) {
      return redirect("/zy/sorry")
    }
  }

  return (
    <Flow interviewData={data.interview} />
  )
}