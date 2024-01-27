import Flow from "@/components/specifics/teamComponents/create/flow"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

export default async function CreateTeam() {

  const session = await getServerSession(authOptions)

  return (
    <main>
      <div className="p-12">
        <Flow userInfo={session} />
      </div>
    </main>
  )
}
