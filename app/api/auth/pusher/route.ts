import { NextResponse, NextRequest } from 'next/server'
import { getPusherInstance } from "@/utils/pusher/server"

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

const pusherServer = getPusherInstance();

export async function POST(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  const data = await request.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);

  return new Response(JSON.stringify(authResponse));
}