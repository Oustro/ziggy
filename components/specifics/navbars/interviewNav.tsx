import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"

export default async function InterviewNav() {

  return (
    <nav className="sticky text-sm top-0 z-50 w-full backdrop-blur from-white-50 h-16 border-b px-6 flex items-center justify-start">
      <div className="flex items-center gap-6">
        <Link href="/info/features">
            <HoverWords>Features</HoverWords>
        </Link>
        <Link href="/info/blog">
            <HoverWords>Blog</HoverWords>
        </Link>
        <Link href="/info/changelog">
            <HoverWords>Changelog</HoverWords>
        </Link>
        <Link href="/info/pricing">
            <HoverWords>Pricing</HoverWords>
        </Link>
      </div>
    </nav>
  )
}