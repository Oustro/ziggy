import HomeNav from "@/components/specifics/navbars/homeNav"
import Footer from "@/components/specifics/navbars/footer"

import Hero from "@/components/specifics/landingComponents/hero"

export default function Home() {

  return (
    <main className="mb-16">
      <HomeNav />
      <div className="p-8 flex gap-8">
        <div className="w-[50%]">
          <div className="w-full rounded">
            <h2 className="text-5xl font-medium">Better Feedback</h2>
            <h1 className="text-7xl mt-4 font-bold">Starts with Ziggy</h1>
            <p className="mt-8 text-lg text-slate-600">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
          </div>
          <div className="flex gap-8 mt-8">
            <div className="p-8 bg-red-400 rounded">
              <h2 className="text-5xl font-medium">Better Feedback</h2>
              <p className="mt-8 text-lg">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
            </div>
            <div className="p-8 bg-red-400 rounded">
              <h2 className="text-5xl font-medium">Better Feedback</h2>
              <p className="mt-8 text-lg">Use AI to conduct interviews so you can get better information than traditional survey forms and do it faster than sitting down and having 1:1 conversations.</p>
            </div>
          </div>
        </div>
        <Hero />
      </div>
      <Footer />
    </main>
  )
}
