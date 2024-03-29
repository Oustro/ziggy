import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

import DashboardNav from "@/components/specifics/navbars/dashboardNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/register/login")
  }
  
  return (
    <main>
      <div className="sm:flex">
        <DashboardNav />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  )
}
