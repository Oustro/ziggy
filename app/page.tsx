import HomeNav from "@/components/specifics/navbars/homeNav"
import Footer from "@/components/specifics/navbars/footer"

import Hero from "@/components/specifics/landingComponents/hero"

import Image from "next/image"

import { FaMagnifyingGlass } from "react-icons/fa6"


export default function Home() {

  return (
    <main className="mb-16">
      <HomeNav />
      <div className="w-full mt-12 text-center">
        <div className="w-full rounded">
          <h2 className="text-7xl font-medium">Better Feedback</h2>
          <h1 className="text-8xl mt-4 font-bold">Starts with Ziggy</h1>
          <p className="mt-8 w-[50%] mx-auto text-xl text-slate-600">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
        </div>
        <div className="mt-24 px-24 relative text-left">
          <Hero />
        </div>
      </div>
      <Footer />
    </main>
  )
}
