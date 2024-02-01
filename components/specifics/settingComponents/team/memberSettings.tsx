import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

export default function GeneralSettings({ team } : { team: teamSavedInfo }) {

  return (
    <main className="w-full bg-green-400">
      <p className="text-xl font-medium">{team.name}</p>
    </main>
  )
}