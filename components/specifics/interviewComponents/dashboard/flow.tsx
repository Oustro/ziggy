"use client"

import { useRouter }  from "next/navigation"

export default function Flow({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div><button onClick={() => router.refresh()}>{children}</button></div>
  )
}