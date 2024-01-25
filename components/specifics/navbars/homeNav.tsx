import Image from "next/image"
import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

export default function HomeNav() {
  return (
    <nav className="sticky text-sm top-0 z-50 w-full backdrop-blur from-white-50 h-16 border-b text-xl px-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-1" href="/">
          <Image
          src="/ziggy-logo.svg"
          alt="Logo"
          width={42}
          height={42}
          />
          <h4 className="text-lg font-semibold">Ziggy</h4>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/info/features">
              <HoverWords>Features</HoverWords>
          </Link>
          <Link href="/info/features">
              <HoverWords>Blog</HoverWords>
          </Link>
          <Link href="/info/features">
              <HoverWords>Changelog</HoverWords>
          </Link>
          <Link href="/info/features">
              <HoverWords>Pricing</HoverWords>
          </Link>
          <Link href="/info/features">
              <HoverWords>GitHub</HoverWords>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/register/login">
          <HoverWords>Login</HoverWords>
        </Link>
        <Link href="/register/signup">
          <BlackButton>Try Ziggy for Free</BlackButton>
        </Link>
      </div>
    </nav>
  )
}