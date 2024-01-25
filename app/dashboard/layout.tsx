import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

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
      {children}
    </main>
  )
}
