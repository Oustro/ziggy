"use client"

import { useState } from "react"

import WhiteButton from "@/components/generics/whiteButton"

import BlackButton from "@/components/generics/blackButton"
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      name: 'AI Interviews',
      content: (
        <div className="mt-12 w-[80%] text-center mx-auto">
          <h2 className="text-2xl font-medium">Ditch forms, have conversations with AI</h2>
          <div className="flex justify-between mt-8 items-center">
            <div className="text-left pr-12">
              <h2 className="text-2xl font-medium">Wonderful insights at scale</h2>
              <h4 className="mt-4">Use AI to have conversational interviews with users and collect insightful and more natural responses than static forms ever could.</h4>
              <div className="inline-block mt-8">
                <Link href="/register/login">
                  <BlackButton>Try AI interviews</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay loop muted preload="auto" className="w-[60%] rounded">
              <source src="/features/form_style.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )
    },
    {
      name: 'Team Collaboration and Branding',
      content: (
        <div className="mt-12 w-[80%] text-center mx-auto">
          <h2 className="text-2xl font-medium">Work togther, do amazing things</h2>
          <div className="flex justify-between mt-8 items-center">
            <div className="text-left pr-12">
              <h2 className="text-2xl font-medium">Built for every team</h2>
              <h4 className="mt-4">Ziggy's commitment to collaboratation and creativity helps teams work together to get the best results.</h4>
              <div className="inline-block mt-8">
                <Link href="/register/login">
                  <BlackButton>Collaborate with your team</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay loop muted preload="auto" className="w-[60%] rounded">
              <source src="/features/team.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )
    },
    {
      name: 'Realtime Trends and Analytics',
      content: (
        <div className="mt-12 w-[80%] text-center mx-auto">
          <h2 className="text-2xl font-medium">Ask questions, get better answers</h2>
          <div className="flex justify-between mt-8 items-center">
            <div className="text-left pr-12">
              <h2 className="text-2xl font-medium">Powerful tools for better insights</h2>
              <h4 className="mt-4">Ziggy's powerful analytical tools help ensure you understand your users' wants and needs.</h4>
              <div className="inline-block mt-8">
                <Link href="/register/login">
                  <BlackButton>Understand faster</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay playsInline loop muted preload="auto" className="w-[60%] rounded">
              <source src="/features/analytics.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )
    },
    {
      name: 'Semantic AI Insights and Search',
      content: (
        <div className="mt-12 w-[80%] text-center mx-auto">
          <h2 className="text-2xl font-medium">Search far, all in one place</h2>
          <div className="flex justify-between mt-8 items-center">
            <div className="text-left pr-12">
              <h2 className="text-2xl font-medium">Find what you want to find</h2>
              <h4 className="mt-4">Use natural language to search for responses from your users and get AI to summarize the results in a meaningful way.</h4>
              <div className="inline-block mt-8">
                <Link href="/register/login">
                  <BlackButton>Search for answers</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay playsInline loop muted preload="auto" className="w-[60%] rounded">
              <source src="/features/search.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )
    },
    {
      name: 'Sources and Transcripts',
      content: (
        <div className="mt-12 w-[80%] text-center mx-auto">
          <h2 className="text-2xl font-medium">Find the truth, go straight to the source</h2>
          <div className="flex justify-between mt-8 items-center">
            <div className="text-left">
              <h2 className="text-2xl font-medium">No more guesswork</h2>
              <h4 className="mt-4">Ziggy makes it easy for you to look directly at what your users are saying so you can have learn more.</h4>
              <div className="inline-block mt-8">
                <Link href="/register/login">
                  <BlackButton>Learn more</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay playsInline loop muted preload="auto" className="w-[60%] rounded">
              <source src="/features/source.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )
    }
  ]

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Features</h1>
      <p className="text-slate-600 mt-6 text-center">We've worked hard to build the best product we can with the features you want.</p>
      <div className="flex text-sm gap-4 justify-center whitespace-nowrap w-[90%] p-2 overflow-scroll mx-auto mt-12 rounded">
        {features.map((feature, index) => (
          <button key={index} onClick={() => setActiveFeature(index)}>
            {index === activeFeature ? (
              <div className="p-2 bg-black text-white font-medium rounded border border-black transition-all">
                {feature.name}
              </div>
            ) : (
              <WhiteButton>{feature.name}</WhiteButton>
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
        key={features[activeFeature].name}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
          {features[activeFeature].content}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}