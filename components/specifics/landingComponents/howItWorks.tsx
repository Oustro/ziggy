"use client"

import { motion } from "framer-motion"

import Image from "next/image"

export default function HowItWorks() {
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
    className="sm:mt-48 text-left px-4"
    >
      <div className="text-center grid grid-cols-1 gap-12 sm:grid-cols-3 mt-16 mx-auto sm:w-[90%]">
        <div className="border rounded p-4">
          <h1 className="text-3xl font-semibold">Step 1</h1>
          <p className="mt-4 text-center text-slate-600 h-16">Set up your interview by adding the purpose and questions you want the AI to ask.</p>
          <Image
          src="/howItWorks/step1.png"
          alt="Step 1"
          priority
          width={300}
          height={300}
          className="rounded mx-auto mt-4"
          />
        </div>
        <div className="border rounded p-4">
          <h1 className="text-3xl font-semibold">Step 2</h1>
          <p className="mt-4 text-center text-slate-600 h-16">Share the Ziggy link of your interview with partcipants so they can take.</p>
          <Image
          src="/howItWorks/step2.png"
          alt="Step 1"
          priority
          width={300}
          height={300}
          className="rounded mx-auto mt-4"
          />
        </div>
        <div className="border rounded p-4">
          <h1 className="text-3xl font-semibold">Step 3</h1>
          <p className="mt-4 text-center text-slate-600 h-16">Analyze responses and get an actionable understanding of what your users are thinking.</p>
          <Image
          src="/howItWorks/step3.png"
          alt="Step 1"
          priority
          width={300}
          height={300}
          className="rounded mx-auto mt-4"
          />
        </div>
      </div>
    </motion.div>
  )
}