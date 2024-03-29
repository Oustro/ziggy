import HomeNav from "@/components/specifics/navbars/homeNav"
import Footer from "@/components/specifics/navbars/footer"

import BlackButton from "@/components/generics/blackButton"

import ScheduleDemo from "@/components/specifics/landingComponents/scheduleDemo"

import Hero from "@/components/specifics/landingComponents/hero"
import Stats from "@/components/specifics/landingComponents/stats"
import Features from "@/components/specifics/landingComponents/features"
import HowItWorks from "@/components/specifics/landingComponents/howItWorks"
import UseCases from "@/components/specifics/landingComponents/useCases"

import Link from "next/link"
import Image from "next/image"

export default function Home() {

  return (
    <main className="mb-16">
      <HomeNav />
      <div className="w-full mt-12 text-center">
        <div className="w-full rounded leading-loose">
          <h2 className="text-3xl sm:text-5xl mx-auto font-medium">Have meaningful 1-on-1 conversations</h2>
          <h2 className="text-4xl sm:text-6xl mt-2 mx-auto font-bold">with everyone</h2>
          <p className="mt-8 w-[90%] sm:w-[70%] mx-auto text-base sm:text-xl text-slate-600">Ziggy automates 1-on-1 conversations using AI, allowing you to conduct feedback interviews seamlessly with anyone, anytime, so you can focus on solving real customer issues faster.</p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/register/signup">
              <BlackButton>Get early access</BlackButton>
            </Link>
            <ScheduleDemo />
          </div>
        </div>
        <Hero />
        <UseCases />
        <HowItWorks />
        <Features />
        <Stats />
        <div className="mt-24 w-full text-center">
          <h2 className="text-3xl sm:text-5xl mx-auto font-medium">Have meaningful 1-on-1 conversations</h2>
          <h2 className="text-4xl sm:text-6xl mt-2 mx-auto font-bold">with everyone</h2>
          <p className="mt-8 w-[50%] mx-auto text-xl text-slate-600">Give your team super powers and start making faster and smarter product decisions.</p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/register/signup">
              <BlackButton>Get early access</BlackButton>
            </Link>
            <ScheduleDemo />
          </div>
          <Image
          src="/ziggy-real.png"
          alt="Ziggy the dog"
          width={300}
          height={300}
          className="mt-24 rounded mx-auto shadow-lg"
          />
          <p className="italic mt-4 text-slate-600 font-medium">The original Ziggy</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
