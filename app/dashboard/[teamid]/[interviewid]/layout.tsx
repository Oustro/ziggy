import InterviewNav from "@/components/specifics/navbars/interviewNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main>
      <InterviewNav />
      {children}
    </main>
  )
}