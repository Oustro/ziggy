"use client"

import { useState } from "react"

import WhiteButton from "@/components/generics/whiteButton"

import BlackButton from "@/components/generics/blackButton"
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"

import { features } from "@/lib/features"

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Features</h1>
      <p className="text-slate-600 mt-6 text-center w-[80%] mx-auto">We've worked hard to build the best product we can with the features you want.</p>
      <div className="grid grid-cols-1 sm:flex text-sm gap-4 justify-center whitespace-nowrap w-[90%] p-2 mx-auto mt-12 rounded">
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
        key={features[activeFeature].key}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
          <div className="mt-12 w-[80%] text-center mx-auto">
            <h2 className="text-3xl font-medium">{features[activeFeature].title}</h2>
            <div className="block sm:flex justify-between w-full mt-8 items-center">
              <div className="text-center sm:text-left">
                <h2 className="hidden sm:block text-2xl font-medium">{features[activeFeature].secondTitle}</h2>
                <h4 className="mt-4 pr-12">{features[activeFeature].description}</h4>
                <div className="inline-block mt-8">
                  <Link href="/register/login">
                    <BlackButton>{features[activeFeature].button}</BlackButton> 
                  </Link>
                </div>
              </div>
              <video autoPlay playsInline loop muted preload="auto" className="mt-8 sm:mt-0 sm:w-[60%] rounded" key={features[activeFeature].key}>
                <source src={features[activeFeature].video} type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}