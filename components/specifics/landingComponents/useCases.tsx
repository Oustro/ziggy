"use client"

import { motion } from "framer-motion"

import Image from "next/image"

export default function UseCases() {
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
    className="mt-24 sm:mt-48 text-left p-4"
    >
      <h2 className="text-2xl sm:text-4xl text-center font-medium">In-depth conversations to keep customers coming back</h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-3 sm:grid-rows-2 mt-8 sm:mt-16 mx-auto sm:w-[90%]">
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">Product Feedback Interviews</h1>
        </div>
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">Employee Feedback Interviews</h1>
        </div>
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">Market Research Interviews</h1>
        </div>
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">UI/UX Testing</h1>
        </div>
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">Exit Interviews</h1>
        </div>
        <div className="border rounded p-6 ">
          <h1 className="text-xl font-semibold">So much more...</h1>
        </div>
      </div>
    </motion.div>
  )
}