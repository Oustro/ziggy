import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

export default function GeneralSettings({ team } : { team: teamSavedInfo }) {

  return (
    <main className="">
      <p className="text-xl font-medium">{team.name}</p>
    </main>
  )
}