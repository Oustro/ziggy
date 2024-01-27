import Image from "next/image"
import Link from "next/link"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import HoverWords from "@/components/generics/hoverWords"
import HoverIcon from "@/components/generics/hoverIcon"

import UserSettings from "@/components/specifics/settingComponents/userSettings"
import LogoutButton from "@/components/specifics/authComponents/logoutButton"

import { IoSettingsOutline, IoFlashOutline, IoChatboxEllipsesOutline, IoHelpOutline, IoAdd } from "react-icons/io5";

export default async function DashboardNav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="sticky top-0 left-0 w-[250px] h-screen relative border-r px-6">
      <Link className="flex h-16 items-center gap-1" href="/dashboard">
        <Image
        src="/ziggy-logo.svg"
        alt="Logo"
        width={40}
        height={40}
        />
        <h4 className="text-lg font-semibold">Ziggy</h4>
      </Link>
      <div className="mt-16 flex items-center border-b pb-1 justify-between">
        <p className="text-sm font-medium">Team</p>
        <Link href="/dashboard/create">
          <HoverIcon><IoAdd /></HoverIcon>
        </Link>
      </div>
      <div className="bottom-8 absolute">
        <div className="flex items-center gap-3 mt-12 w-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full h-8 w-8"></div>
          <div className="flex-1 min-w-0">
            <h2 className="font-medium truncate">{session?.name}</h2>
            <p className="text-xs text-slate-600 truncate">{session?.email}</p>
          </div>
        </div>
        <div className="text-sm mt-4 font-medium grid gap-3">
          <Link target="_blank" href="https://www.github.com/oustro/ziggy">
            <HoverWords><span className="flex items-center gap-3"><IoFlashOutline /> Contribute</span></HoverWords>
          </Link>
          <Link target="_blank" href="https://www.useziggy.com">
            <HoverWords><span className="flex items-center gap-3"><IoChatboxEllipsesOutline /> Feedback</span></HoverWords>
          </Link>
          <Link target="_blank" href="https://www.github.com/oustro/ziggy/issues">
            <HoverWords><span className="flex items-center gap-3"><IoHelpOutline /> Help</span></HoverWords>
          </Link>
          <UserSettings><HoverWords><span className="flex items-center gap-3"><IoSettingsOutline /> Settings</span></HoverWords></UserSettings>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  )
}