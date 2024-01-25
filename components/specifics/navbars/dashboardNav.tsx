import Image from "next/image"
import Link from "next/link"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import HoverWords from "@/components/generics/hoverWords"
import Settings from "@/components/specifics/settings"

import { IoSettingsOutline, IoFlashOutline, IoChatboxEllipsesOutline, IoHelpOutline } from "react-icons/io5";

export default async function DashboardNav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="fixed top-0 left-0 z-50 w-64 h-screen relative border-r border-b">
      <div className="px-6">
        <Link className="flex h-16 items-center gap-1" href="/dashboard">
          <Image
          src="/ziggy-logo.svg"
          alt="Logo"
          width={42}
          height={42}
          />
          <h4 className="text-lg font-semibold">Ziggy</h4>
        </Link>
        <div className="text-sm mt-6 font-medium grid gap-2">
          <Link target="_blank" href="https://www.github.com/oustro/ziggy">
            <HoverWords><span className="flex items-center gap-3"><IoFlashOutline /> Contribute</span></HoverWords>
          </Link>
          <Link target="_blank" href="https://www.useziggy.com">
            <HoverWords><span className="flex items-center gap-3"><IoChatboxEllipsesOutline /> Feedback</span></HoverWords>
          </Link>
          <Link target="_blank" href="https://www.github.com/oustro/ziggy/issues">
            <HoverWords><span className="flex items-center gap-3"><IoHelpOutline /> Help</span></HoverWords>
          </Link>
          <Settings><HoverWords><span className="flex items-center gap-3"><IoSettingsOutline /> Settings</span></HoverWords></Settings>
        </div>
      </div>
      <div className="flex bottom-8 border-t absolute items-center gap-3 mt-4 w-full pt-4 px-6 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full h-8 w-8"></div>
        <div className="flex-1 min-w-0">
          <h2 className="font-medium truncate">{session?.name}</h2>
          <p className="text-xs text-slate-600 truncate">{session?.email}</p>
        </div>
      </div>

    </nav>
  )
}