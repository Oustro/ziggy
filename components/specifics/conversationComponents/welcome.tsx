import { motion } from "framer-motion"
import BlackButton from "@/components/generics/blackButton"

import Image from "next/image"

export default function Welcome({ setView, interviewInfo } : { setView: Function, interviewInfo: any }) {

  return (
    <div className="flex w-full px-48 h-full items-center">
      <motion.div 
      className="text-left"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <Image
        src={interviewInfo.team.logo}
        alt="Team Logo"
        width={80}
        height={80}
        className="rounded"
        />
        <h1 className="text-5xl mt-16 font-semibold">
          Hello I'm {interviewInfo.team.interviewer},
        </h1>
        <h1 className="text-2xl mt-8">
          Thank you for being here, I'm going to ask you some questions for {interviewInfo.team.name}. Are you ready to get started?
        </h1>
        <button className="mt-16 text-lg" onClick={() => setView(interviewInfo.collect ? 1 : interviewInfo.team.style === 0 ? 2 : 3)}>
          <BlackButton>
            Yes I am, let's start
          </BlackButton>
        </button>
      </motion.div>
    </div>
  )
}