import { NextResponse, NextRequest } from "next/server";
import { verifyKey } from "@unkey/api";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function GET(request: NextRequest) {
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

  const token = request.nextUrl.searchParams.get("token") as string;
  const id = request.nextUrl.searchParams.get("id") as string;

  try {
    const { result, error } = await verifyKey({
      key: token,
      apiId: process.env.UNKEY_API_ID as string,
    });

    console.log(result, error);

    if (error) {
      return NextResponse.json({ status: 503 });
    }

    if (!result.valid || result.meta?.team !== id) {
      return NextResponse.json({ status: 406 });
    }

    return NextResponse.json({
      status: 200,
      interviewName: result.meta?.interview,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
