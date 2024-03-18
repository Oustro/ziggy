import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ziggy - Better feedback starts with Ziggy.",
  description: "The AI tool to conduct interviews and get better feedback than traditional survey forms.",
  keywords: ["Feedback", "AI Feedback", "Better feedback", "Analytics"],
  openGraph: {
    images: '/ziggy-og.png',
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico',
        href: '/favicon-light.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico',
        href: '/favicon-dark.ico',
      },
    ],
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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
