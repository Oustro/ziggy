"use server";

import { MostSimQuick, DetermineEnd } from "@/lib/prompt";

import OpenAI from "openai";

import { Unkey } from "@unkey/api";

export async function progress(questions: Array<any>, question: string) {
  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: MostSimQuick(questions, question),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function end(question: string) {
  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: DetermineEnd(),
      },
      { role: "user", content: question },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function tokens(teamid: string) {
  const unkey = new Unkey({ rootKey: process.env.UNKEY_API_KEY as string });
  const created = await unkey.keys.create({
    apiId: process.env.UNKEY_API_ID as string,
    prefix: "ziggy",
    ownerId: teamid,
    byteLength: 32,
    remaining: 1,
    meta: {
      description: process.env.REWARD_DESCRIPTION as string,
    },
  });

  return created.result?.key as string;
}
