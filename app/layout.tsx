import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ziggy - Better feedback starts with Ziggy.",
  description: "The AI tool to conduct interviews and get better feedback than traditional survey forms.",
  keywords: ["Feedback", "AI Feedback", "Better feedback", "Analytics"],
  openGraph: {
    images: '/ziggy-og.png',
  },
  metadataBase: new URL("https://www.useziggy.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
