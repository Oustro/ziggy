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

  const responseConversationRecord = await fetch(process.env.MODE_URL+"/api/conversation/record", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      conversation: conversation
    })
  })

  const updatedConvo = await responseConversationRecord.json()
  conversation.push(updatedConvo.question)

  await fetch(process.env.MODE_URL+"/api/conversation/record/transcript/update", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      transcriptId: data.transcriptId,
      conversation: conversation
    })
  })
  
  return {
    tid: data.transcriptId, 
    updatedConvo: conversation
  }
}

export async function Converse(conversation: Array<{role: string, content: string}>, interviewee: string, interviewId: string, transcriptId: string) {
  console.log(transcriptId + "!")
  return "success"  
}