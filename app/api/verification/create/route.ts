import { NextResponse, NextRequest } from "next/server";
import { Unkey } from "@unkey/api";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function POST(request: NextRequest) {
  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  });

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  });

  const identifier = "Token Verification API";
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { message: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  const { name, teamid } = (await request.json()) as {
    name: string;
    teamid: string;
  };

  try {
    const unkey = new Unkey({ rootKey: process.env.UNKEY_API_KEY as string });
    const created = await unkey.keys.create({
      apiId: process.env.UNKEY_API_ID as string,
      prefix: "ziggy",
      byteLength: 32,
      remaining: 1,
      meta: {
        interview: name,
        team: teamid,
      },
    });

    return NextResponse.json({ token: created.result?.key }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
