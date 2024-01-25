import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import LogoutButton from "@/components/specifics/authComponents/logoutButton"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <div className="h-96 w-full">
        <h1>Dashboard</h1>
        <p>{session?.email}</p>
        <p>{session?.name}</p>
        <LogoutButton />
      </div>
    </main>
  )
}
