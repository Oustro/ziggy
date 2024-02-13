"use server"

export async function Open(conversation: Array<{role: string, content: string}>, interviewee: string, interviewId: string) {
  const responseConversationRecordTranscriptCreate = await fetch(process.env.MODE_URL+"/api/conversation/record/transcript/create", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversation: conversation,
      interviewee: interviewee,
      interviewId: interviewId,
    })
  })

  const data = await responseConversationRecordTranscriptCreate.json()

  Converse(conversation, interviewee, interviewId, data.transcriptId)
  
  return {
    tid: data.transcriptId, 
    updatedConvo: conversation
  }
}

export async function Converse(conversation: Array<{role: string, content: string}>, interviewee: string, interviewId: string, transcriptId: string) {
  console.log(transcriptId + "!")
  return "success"  
}