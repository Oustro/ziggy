import HomeNav from "@/components/specifics/navbars/homeNav"
import Footer from "@/components/specifics/navbars/footer"

import Hero from "@/components/specifics/landingComponents/hero"

import { FaMagnifyingGlass } from "react-icons/fa6"

import Image from "next/image"

import Link from "next/link"

export default function Home() {

  return (
    <main className="mb-16">
      <HomeNav />
      <div className="p-8 flex gap-8">
        <div className="w-[50%] flex h-[35rem] flex-col">
          <div className="w-full rounded">
            <h2 className="text-5xl font-medium">Better Feedback</h2>
            <h1 className="text-6xl mt-4 font-bold">Starts with Ziggy</h1>
            <p className="mt-8 text-lg text-slate-600">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
          </div>
          <div className="rounded justify-center flex-col w-full mt-8 flex-grow border border-slate-600 relative">
            <div className="absolute top-0 w-full px-4 pt-4">
              <div className="border-b border-slate-600 pb-1 flex items-center gap-2">
                <FaMagnifyingGlass />
                <p>Why do businesses love Ziggy?</p>
              </div>
            </div>
            <div className="h-full p-4 flex items-center gap-4">
              <Image
              src="/ziggy-logo.svg"
              alt="Ziggy logo"
              priority
              width={40}
              height={40}
              />
              <p className="mt-4">
                According to responses from interviews, businesses and entrepreneurs love Ziggy because feedback from 
                users are much more natural and insightful than before. Additionally Ziggy's powerful and useful analytical
                features make understaing feedback much easier. Users also appreciate that Ziggy is <span className="font-bold underline"><Link href="https://github.com/oustro/ziggy">100% open source.</Link></span>
              </p>
            </div>
          </div>
        </div>
        <Hero />
      </div>
      <Footer />
    </main>
  )
}
