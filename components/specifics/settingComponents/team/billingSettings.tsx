import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

export default function BillingSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function}) {

  return (
    <main>
      <div>
        <h1>Update memers</h1>
      </div>
    </main>
  )
}