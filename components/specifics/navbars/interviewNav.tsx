import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"

export default async function InterviewNav() {

  return (
    <nav className="sticky text-sm top-0 z-10 w-full bg-white h-16 border-b px-6 flex items-center justify-between">
        <div className="flex gap-6">
          <HoverWords>Overview</HoverWords>
          <HoverWords>Ask Ziggy</HoverWords>
          <HoverWords>Search</HoverWords>
          <HoverWords>Transcripts</HoverWords>
        </div>
        <div className="flex gap-6">
          <HoverWords>Distribute</HoverWords>
          <HoverWords>Settings</HoverWords>
        </div>
    </nav>
  )
}