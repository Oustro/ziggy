"use server"

import { MostSimQuick, DetermineEnd } from "@/lib/prompt"

import OpenAI from "openai"

export async function progress(questions: Array<any>, question: string) {
  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: MostSimQuick(questions, question)
      }
    ],
    model: "gpt-3.5-turbo",
  })

  return completion.choices[0].message.content
}

export async function end(question: string) {
  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: DetermineEnd()
      },
      {"role": "user", "content": question},
    ],
    model: "gpt-3.5-turbo",
  })

  return completion.choices[0].message.content
}