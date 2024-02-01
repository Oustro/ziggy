import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

export default function GeneralSettings({ team } : { team: teamSavedInfo }) {

  return (
    <main className="bg-green-400 w-full p-2">
      <p className="text-xl font-medium">{team.name}</p>
    </main>
  )
}