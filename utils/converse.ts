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

export async function Converse(conversation: Array<{role: string, content: string}>, answer: string, interviewee: string, interviewId: string, transcriptId: string) {
  const prevQuestion = conversation[conversation.length - 1]

  console.log(prevQuestion)
  console.log(answer)

  // get the sentiment of the answer

  // get the similiarity of the question to guide questions

  // get the emdedding of the question

  // upsert into question vectors to pinecone index of with the interviewId as the name with the following metadata:
  // - question
  // - answer
  // - answer sentiment
  // - most similiar question
  // - interviewee

  // update the conversation with the following:
  // - the answer

  // get the next question from openAI with the updated transcript

  // update the transcript with the following:
  // - the next question
  // - the updated conversation
  // - the sentiment of the answer from prevQuestion

  // add the question to the conversation
  
  // return the updated conversation
  
  return conversation
}