import HomeNav from "@/components/specifics/navbars/homeNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="mb-16">
        <HomeNav />
        {children}
      </div>
    </main>
  )
}
