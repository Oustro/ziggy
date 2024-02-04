import TeamCards from "@/components/specifics/teamComponents/cards/teamCards"
import BlackButton from "@/components/generics/blackButton"

import { IoAdd } from "react-icons/io5";

import Link from "next/link"

export default async function Dashboard() {   

  return (
    <main>
      <div className="flex items-center justify-between mt-6 px-12">
        <h1 className="text-4xl font-semibold">Current Teams</h1>
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
