import Image from "next/image"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Ziggy",
}

export default function Blog() {
  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Blog</h1>
      <p className="text-slate-600 mt-6 text-center">We're currently working on this page. It'll be done soon! In the mean time enjoy this picture.</p>
      <Image
      src="/ziggy-real.png"
      alt="Ziggy the dog"
      width={300}
      height={300}
      className="mt-24 rounded-full mx-auto shadow-lg"
      />
      <p className="italic mt-4 text-slate-600 text-center font-medium">The original Ziggy</p>
    </main>
  )
}