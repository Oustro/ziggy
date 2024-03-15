"use client"

import { motion } from "framer-motion"

export default function Stats() {
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
    className="sm:mt-48 text-left px-24"
    >
      <div className="text-center grid grid-cols-1 gap-12 sm:grid-cols-3 mt-16 w-[80%] mx-auto">
        <div>
          <h1 className="text-6xl font-semibold">500+</h1>
          <p className="mt-4 text-center text-slate-600">AI Interviews Conducted</p>
        </div>
        <div>
          <h1 className="text-6xl font-semibold">15+</h1>
          <p className="mt-4 text-center text-slate-600">Product Teams Empowered</p>
        </div>
        <div>
          <h1 className="text-6xl font-semibold">35+</h1>
          <p className="mt-4 text-center text-slate-600">Product and Services Researched</p>
        </div>
      </div>
    </motion.div>
  )
}