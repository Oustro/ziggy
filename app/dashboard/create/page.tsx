import Flow from "@/components/specifics/teamComponents/create/flow"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Team | Ziggy",
}

export default async function CreateTeam() {

  return (
    <main>
      <div className="p-12">
        <Flow />
      </div>
    </main>
  )
}
