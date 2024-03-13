"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"

import { FiSend } from "react-icons/fi"

import Image from "next/image"

import { motion, AnimatePresence } from "framer-motion"

import Link from "next/link"

export default function Hero() {

  const convo = [
    {
      question: "Can you tell me about your experience with Ziggy?",
      answer: "I love Ziggy! It's so easy to use and I get better and clearer feedback from my users.",
      button: (
        <button onClick={() => setActiveConvo(1)} className="mt-8 relative">
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8B5CF6]"></span>
          </span>
          <BlackButton>
            <span className="flex items-center gap-2"><FiSend /> Continue</span>
          </BlackButton>
        </button>
      )
    },
    {
      question: "Great to hear, but what 'better and clearer feedback' mean?",
      answer: "The feedback is feels like conducting interviews with users, but at scale. It's amazing!",
      button: (
        <button onClick={() => setActiveConvo(2)} className="mt-8 relative">
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8B5CF6]"></span>
          </span>
          <BlackButton>
            <span className="flex items-center gap-2"><FiSend /> Continue</span>
          </BlackButton>
        </button>
      )
    },
    {
      question: "Wow! What should everyone do now?",
      answer: "Sign up and try Ziggy for free today!",
      button: (
        <div className="flex mt-8 gap-4">
          <Link href="/register/signup" className="relative">
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8B5CF6]"></span>
            </span>
            <BlackButton>
              Get started for free
            </BlackButton>
          </Link>
        </div>
      )
    }
  ]

  const [activeConvo, setActiveConvo] = useState(0)

  return (
    <div className="relative border flex flex-col justify-center border-slate-600 rounded w-[50%]"
    style={{
      background: 'linear-gradient(to top right, #FFFFFF 40%, #8B5CF6 145%)'
    }}
    >
      <div className="bg-slate-100 absolute w-full top-0 h-6 border-b border-slate-600 rounded-t flex gap-1 items-center px-2">
        <div className="bg-red-300 rounded-full h-2 w-2" />  
        <div className="bg-yellow-300 rounded-full h-2 w-2" />  
        <div className="bg-green-300 rounded-full h-2 w-2" />  
      </div>
      <div className="p-8 text-sm">
        <div className="flex items-center">
          <Image
            src="/ziggy-logo.svg"
            alt="Ziggy logo"
            width={40}
            height={40}
          />
          <p className="text-lg font-semibold mt-2">Ziggy</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
          key={convo[activeConvo].question}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          >        
            <p className="mt-8 text-2xl font-medium">{convo[activeConvo].question}</p>
            <p className="mt-8 border-b pb-1 border-slate-600 text-base">{convo[activeConvo].answer}</p>
          </motion.div>
        </AnimatePresence>
        {convo[activeConvo].button}
      </div>
    </div>
  )
}