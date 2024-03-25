import Image from "next/image"
import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

import HomeList from "@/components/specifics/navbars/utility/homeList"

import ScheduleDemo from "@/components/specifics/landingComponents/scheduleDemo"

import { VscLinkExternal } from "react-icons/vsc"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

export default async function HomeNav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="sticky text-sm top-0 z-50 w-full backdrop-blur from-white-50 h-16 border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link className="flex items-center gap-1" href="/">
          <Image
          src="/ziggy-logo.svg"
          alt="Logo"
          width={40}
          height={40}
          />
          <h4 className="text-lg font-semibold">Ziggy</h4>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
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
          <Link target="_blank" href="https://www.github.com/oustro/ziggy">
            <HoverWords><span className="flex items-center gap-1">❤️ Open Source <VscLinkExternal /></span></HoverWords>
          </Link>
        </div>
      </div>
      <div className="sm:hidden">
        {session ? (
          <Link href="/dashboard">
            <BlackButton>Dashboard</BlackButton>
          </Link>
        ) : (
          <HomeList />
        )}
      </div>
      <div className="hidden sm:flex items-center gap-6">
        {session ? (
          <Link href="/dashboard">
            <BlackButton>Dashboard</BlackButton>
          </Link>
        ) : (
          <>
            <Link href="/register/login">
              <HoverWords>Login</HoverWords>
            </Link>
            <Link href="/register/signup">
              <BlackButton>Try Ziggy for Free</BlackButton>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}