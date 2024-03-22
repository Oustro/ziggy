import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ziggy - Have meaingful conversations with everyone.",
  description: "Ziggy saves you the time of scheduling 1-on-1s by using AI to conduct them just like you would, except with anyone at any time, and stay in the loop with real-time analytics.",
  keywords: ["Feedback", "AI Feedback", "Better feedback", "Analytics", "one-on-ones", "Scale", "1-on-1s", "1-on-1s", "Ziggy", "Ziggy AI", "Ziggy Feedback", "Ziggy Analytics", "Ziggy 1-on-1s", "Ziggy Scale", "Ziggy one-on-ones"],
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
