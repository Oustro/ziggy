import TeamCards from "@/components/specifics/teamComponents/cards/teamCards"
import BlackButton from "@/components/generics/blackButton"

import { IoAdd } from "react-icons/io5"

import Link from "next/link"

import { redirect } from "next/navigation"
import prisma from "@/utils/db"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Ziggy",
}

export default async function Dashboard() {   
  const session = await getServerSession(authOptions)

  const teams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          email: session?.email
        }
      }
    }
  })

  if (teams.length === 0 || !teams) {
    redirect("/dashboard/create")
  }

  return (
    <main className="mb-16">
      <div className="flex items-center justify-between mt-6 px-12">
        <h1 className="text-4xl font-semibold">Your teams</h1>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard/create" className="flex items-center gap-2">
            <BlackButton><span className="flex items-center gap-1"><IoAdd /> Create Team</span></BlackButton>
          </Link>
        </div>
      </div>
      <TeamCards />
    </main>
  )
}
