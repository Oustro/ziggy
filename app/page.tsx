import HomeNav from "@/components/specifics/navbars/homeNav"
import Footer from "@/components/specifics/navbars/footer"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton"

import Hero from "@/components/specifics/landingComponents/hero"
import Stats from "@/components/specifics/landingComponents/stats"
import Features from "@/components/specifics/landingComponents/features"

import Link from "next/link"
import Image from "next/image"

export default function Home() {

  return (
    <main className="mb-16">
      <HomeNav />
      <div className="w-full mt-12 text-center">
        <div className="w-full rounded">
          <h2 className="text-7xl font-medium">Better Feedback</h2>
          <h1 className="text-8xl mt-4 font-bold">Starts with Ziggy.</h1>
          <p className="mt-8 w-[50%] mx-auto text-xl text-slate-600">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/register/signup">
              <BlackButton>Get started for free</BlackButton>
            </Link>
            <Link href="/info/contact?reason=Demo of Ziggy">
              <WhiteButton>Get a demo</WhiteButton>
            </Link>
          </div>
        </div>
        <div className="mt-28 px-24 relative text-left">
          <Hero />
        </div>
        <Stats />
        <Features />
        <div className="mt-24 w-full text-center">
          <h2 className="text-7xl font-medium">Better Feedback</h2>
          <h1 className="text-8xl mt-4 font-bold">Starts here.</h1>
          <p className="mt-8 w-[50%] mx-auto text-xl text-slate-600">Give your team super powers to make faster and smarter product decisions.</p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/register/signup">
              <BlackButton>Get started for free</BlackButton>
            </Link>
            <Link href="/info/contact?reason=Demo of Ziggy">
              <WhiteButton>Get a demo</WhiteButton>
            </Link>
          </div>
          <Image
          src="/ziggy-real.png"
          alt="Ziggy the dog"
          width={300}
          height={300}
          className="mt-24 rounded-full mx-auto shadow-lg"
          />
          <p className="italic mt-4 text-slate-600 font-medium">The original Ziggy</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
