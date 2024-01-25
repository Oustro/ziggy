import RegisterNav from "@/components/specifics/navbars/registerNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <RegisterNav />
      {children}
    </main>
  );
}
