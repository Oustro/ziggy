"use client"

import { motion } from "framer-motion"

import BlackButton from "@/components/generics/blackButton"

import { features } from "@/lib/features"

import Link from "next/link"

export default function Features() {
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
    className="mt-8 sm:mt-24 text-left px-4 sm:px-24 relative"
    >
      <h2 className="sticky top-24 text-2xl sm:text-4xl text-center font-medium">Upgrade the way you gather, analyze, and understand your users</h2>
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
        className="top-56 sm:top-48 mt-16 bg-white sticky"
        >
          <div className="block sm:flex justify-between w-full mt-8 items-center border p-4 sm:p-16 border-slate-600 rounded">
            <div className="text-left sm:pr-12">
              <h2 className="text-3xl sm:text-4xl font-medium">{feature.secondTitle}</h2>
              <p className="mt-4 text-lg text-slate-600">{feature.description}</p>
              <div className="inline-block text-sm sm:text-base mt-8">
                <Link href="/register/login">
                  <BlackButton>{feature.button}</BlackButton> 
                </Link>
              </div>
            </div>
            <video autoPlay loop muted preload="auto" className="mt-8 sm:mt-0 sm:w-[50%] shadow-lg rounded" key={feature.key}>
              <source src={feature.video} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}