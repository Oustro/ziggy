"use client"

import { motion } from "framer-motion"

import BlackButton from "@/components/generics/blackButton"

import Link from "next/link"

export default function Features() {
  const features = [
    {
      content: (
        <div className="flex justify-between w-full mt-8 items-center border p-16 border-slate-600 rounded">
          <div className="text-left pr-12">
            <h2 className="text-4xl font-medium">Wonderful insights at scale</h2>
            <div className="inline-block mt-8">
              <Link href="/register/login">
                <BlackButton>Try AI interviews</BlackButton> 
              </Link>
            </div>
          </div>
          <video autoPlay loop muted preload="auto" className="w-[50%] shadow-lg rounded" key="interviews">
            <source src="/features/form_style.mp4" type="video/mp4" />
          </video>
        </div>
      )
    },
    {
      content: (
        <div className="flex justify-between w-full mt-8 items-center border p-16 border-slate-600 rounded">
          <div className="text-left pr-12">
            <h2 className="text-4xl font-medium">Built for every team</h2>
            <div className="inline-block mt-8">
              <Link href="/register/login">
                <BlackButton>Collaborate with your team</BlackButton> 
              </Link>
            </div>
          </div>
          <video autoPlay loop muted preload="auto" className="w-[50%] shadow-lg rounded" key="team">
            <source src="/features/team.mp4" type="video/mp4" />
          </video>
        </div>
      )
    },
    {
      content: (
        <div className="flex justify-between w-full mt-8 items-center border p-16 border-slate-600 rounded">
          <div className="text-left pr-12">
            <h2 className="text-4xl font-medium">Powerful tools for better insights</h2>
            <div className="inline-block mt-8">
              <Link href="/register/login">
                <BlackButton>Try AI interviews</BlackButton> 
              </Link>
            </div>
          </div>
          <video autoPlay loop muted preload="auto" className="w-[50%] shadow-lg rounded" key="interviews">
            <source src="/features/form_style.mp4" type="video/mp4" />
          </video>
        </div>
      )
    },
    {
      content: (
        <div className="flex justify-between w-full mt-8 items-center border p-16 border-slate-600 rounded">
          <div className="text-left pr-12">
            <h2 className="text-4xl font-medium">Find what you want to find</h2>
            <div className="inline-block mt-8">
              <Link href="/register/login">
                <BlackButton>Search for answers</BlackButton> 
              </Link>
            </div>
          </div>
          <video autoPlay playsInline loop muted preload="auto" className="w-[50%] shadow-lg rounded">
            <source src="/features/search.mp4" type="video/mp4" />
          </video>
        </div>
      )
    },
    {
      content: (
        <div className="flex justify-between w-full mt-8 items-center border p-16 border-slate-600 rounded">
          <div className="text-left">
            <h2 className="text-4xl font-medium">No more guesswork</h2>
            <div className="inline-block mt-8">
              <Link href="/register/login">
                <BlackButton>Learn more</BlackButton> 
              </Link>
            </div>
          </div>
          <video autoPlay playsInline loop muted preload="auto" className="w-[50%] shadow-lg rounded">
            <source src="/features/source.mp4" type="video/mp4" />
          </video>
        </div>
      )
    }
  ]

  return (
    <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    viewport={{ once: true }}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.5, delay: 0.3 }}
    className="mt-24 text-left px-24 relative"
    >
      <h2 className="sticky top-24 text-4xl text-center font-medium">Upgrade the way you get, and analyze user feedback</h2>
      {features.map((feature, index) => (
        <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        viewport={{ once: true }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.1, delay: 0.1 }}
        key={index} 
        className="top-48 mt-16 bg-white sticky"
        >
          {feature.content}
        </motion.div>
      ))}
    </motion.div>
  )
}