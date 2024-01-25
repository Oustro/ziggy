import HomeNav from "@/components/specifics/navbars/homeNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HomeNav />
      {children}
    </main>
  );
}
