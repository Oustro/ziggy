import { motion } from "framer-motion"
import BlackButton from "@/components/generics/blackButton"

import Image from "next/image"

export default function Collect({ setView, interviewInfo, setInterviewee } : { setView: Function, interviewInfo: any, setInterviewee: Function }) {

  return (
    <div className="flex w-full justify-center px-8 sm:px-48 h-full items-center">
      <motion.div 
      className="text-left"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <Image
        src={interviewInfo.team.logo}
        alt="Team Logo"
        width={50}
        height={50}
        className="rounded"
        />
        <h1 className="text-2xl mt-4 font-semibold">
          {interviewInfo.team.interviewer}
        </h1>
        <h1 className="text-3xl mt-8">
          Before we begin, can you please provide your email?
        </h1>
        <form onSubmit={() => setView(interviewInfo.team.style === 0 ? 2 : 3)}>
          <input
          type="email"
          onChange={(e) => setInterviewee(e.target.value)}
          className="w-full mt-24 border-b border-slate-600 bg-transparent pb-2 text-base focus:outline-none"
          placeholder="Enter your email..."
          required
          />
          <button className="mt-16 text-lg" type="submit">
          <BlackButton>
            Continue
          </BlackButton>
        </button>
        </form>
      </motion.div>
    </div>
  )
}