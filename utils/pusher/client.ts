import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  authEndpoint: "/api/pusher/auth",
});
