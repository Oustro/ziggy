"use client"

import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"

import { FiSend } from "react-icons/fi"

import Image from "next/image"

import { motion, AnimatePresence } from "framer-motion"

import { FaMagnifyingGlass } from "react-icons/fa6"

import Link from "next/link"

import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, PointElement, LinearScale, LineElement } from 'chart.js'
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)

export default function Hero() {

  const convo = [
    {
      question: "Can you tell me about your experience with Ziggy?",
      answer: "Ziggy made it easy to get more insightful feedback from my users.",
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
      question: "Great to hear, but what does 'more insightful feedback' mean?",
      answer: "The feedback is feels like conducting interviews with users, but at scale!",
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

  const useCases = [
    "Customer Feedback",
    "Product Feedback",
    "Employee Feedback",
    "Market Research",
    "Exit Interviews",
    "UI/UX Testing",
    "User Research",
    "Event Feedback",
    "1-on-1 Interviews",
    "Customer Discovery",
    "Policy feedback"
  ]

  const [activeConvo, setActiveConvo] = useState(0)

  return (
    <div className="sm:mt-28 justify-center text-left sm:flex items-center"> 
      <div className="mt-12 sm:mt-0 w-[90%] mx-auto sm:absolute">
        <div className="group w-full inline-flex flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-fast " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-fast " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="group w-full mt-6 inline-flex flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-slow " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-slow " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="group w-full inline-flex mt-6 flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-medium " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-medium " aria-hidden="true">
            {useCases.map((use, index) => (
              <li key={index}>
                <div className="border rounded justify-center h-16 w-48 flex items-center">
                  <p>{use}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative z-20 border flex flex-col h-[30rem] sm:h-[35rem] justify-center border-slate-600 rounded w-[85%] sm:w-[55rem] mx-auto mt-8 shadow-2xl"
      style={{
        background: 'linear-gradient(to top right, #FFFFFF 40%, #8B5CF6 145%)'
      }}
      >
        <div className="bg-slate-100 absolute w-full top-0 h-6 border-b border-slate-600 rounded-t flex justify-end gap-1 items-center px-2">
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
              priority
            />
            <p className="text-base sm:text-lg font-semibold mt-2">Ziggy</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
            key={convo[activeConvo].question}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            >        
              <p className="mt-8 text-lg sm:text-2xl font-medium">{convo[activeConvo].question}</p>
              <p className="mt-8 border-b pb-1 border-slate-600 text-base">{convo[activeConvo].answer}</p>
            </motion.div>
          </AnimatePresence>
          {convo[activeConvo].button}
        </div>
        <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10, rotate: 19 },
          visible: { opacity: 1, y: 0, rotate: 19 }
        }}
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden sm:block absolute top-20 -right-48 w-[30rem] border border-slate-600 bg-white rounded p-4">
          <p className="text-lg font-medium">Key Trends</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border rounded p-4">
              <p className="text-base font-medium">Better Feedback</p>
              <p className="text-xs mt-3 text-slate-600 font-medium">Explore &rsaquo;</p>
            </div>
            <div className="border rounded p-4">
              <p className="text-base font-medium">At Scale</p>
              <p className="text-xs mt-3 text-slate-600 font-medium">Explore &rsaquo;</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10, rotate: -20 },
          visible: { opacity: 1, y: 0, rotate: -20 }
        }}
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden sm:block absolute -top-8 -left-36 w-96 border border-slate-600 bg-white rounded p-4"
        >
          <p className="text-lg font-medium">AI Q&A</p>
          <div className="border-b border-slate-600 pb-1 flex items-center gap-2 mt-4">
            <FaMagnifyingGlass />
            <p>Why do businesses love Ziggy?</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Image
            src="/ziggy-logo.svg"
            alt="Ziggy logo"
            width={40}
            height={40}
            priority
            />
            <p>Based on reponses, businesses love Ziggy for a number of reasons...</p>
          </div>
        </motion.div>
        <motion.div
        variants={{
          hidden: { opacity: 0, y: 10, rotate: -8 },
          visible: { opacity: 1, y: 0, rotate: -8 }
        }} 
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden sm:block absolute -bottom-24 h-48 right-72 w-96 border border-slate-600 bg-white rounded p-4"
        >
          <p className="text-lg font-medium">Interview Activity</p>
          <div className="mt-4 h-[80%] pb-4">
            <Line
            data={{
              labels: ['3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24'],
              datasets: [{
                label: 'My First Dataset',
                data: [30, 50, 20, 30, 90, 120, 190],
                fill: true,
                animation: false,
                borderWidth: 2,
                borderColor: '#475569',
                tension: 0.09
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 0
                }
              },
              scales: {
                x: {
                  display: true,
                },
                y: {
                  display: true,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true
                },
              },
            }}
            />
          </div>
        </motion.div>
      </div>
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10, rotate: 19 },
          visible: { opacity: 1, y: 0, rotate: 19 }
        }}
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="block sm:hidden mt-24 w-[80%] mx-auto border border-slate-600 bg-white rounded p-4">
          <p className="text-lg font-medium">Key Trends</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border rounded p-4">
              <p className="text-base font-medium">Better Feedback</p>
              <p className="text-xs mt-3 text-slate-600 font-medium">Explore &rsaquo;</p>
            </div>
            <div className="border rounded p-4">
              <p className="text-base font-medium">At Scale</p>
              <p className="text-xs mt-3 text-slate-600 font-medium">Explore &rsaquo;</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10, rotate: -20},
          visible: { opacity: 1, y: 0, rotate: -20}
        }}
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        className="block sm:hidden w-[80%] z-20 mx-auto border border-slate-600 bg-white rounded p-4"
        >
          <p className="text-lg font-medium">AI Q&A</p>
          <div className="border-b border-slate-600 pb-1 flex items-center gap-2 mt-4">
            <FaMagnifyingGlass />
            <p>Why do businesses love Ziggy?</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Image
            src="/ziggy-logo.svg"
            alt="Ziggy logo"
            width={40}
            height={40}
            priority
            />
            <p>Based on reponses, businesses love Ziggy for a number of reasons...</p>
          </div>
        </motion.div>
        <motion.div
        variants={{
          hidden: { opacity: 0, y: 10, rotate: 8 },
          visible: { opacity: 1, y: 0, rotate: 8 }
        }} 
        viewport={{ once: true }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="block sm:hidden h-48 w-[80%] mx-auto border border-slate-600 bg-white rounded p-4"
        >
          <p className="text-lg font-medium">Interview Activity</p>
          <div className="mt-4 h-[80%] pb-4">
            <Line
            data={{
              labels: ['3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24'],
              datasets: [{
                label: 'My First Dataset',
                data: [30, 50, 20, 30, 90, 120, 190],
                fill: true,
                animation: false,
                borderWidth: 2,
                borderColor: '#475569',
                tension: 0.09
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 0
                }
              },
              scales: {
                x: {
                  display: true,
                },
                y: {
                  display: true,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true
                },
              },
            }}
            />
          </div>
        </motion.div>
    </div>
  )
}