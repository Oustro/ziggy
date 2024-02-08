import { motion } from "framer-motion"
import BlackButton from "@/components/generics/blackButton"

export default function Welcome({ setView } : { setView: Function }) {

  return (
    <div className="flex justify-center w-full px-48 h-full items-center">
      <motion.div 
      className="text-left"
      onClick={() => setView(1)}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-semibold">
          Hello, thank you for being here. I am going to ask you some questions, are you ready to get started?
        </h1>
        <button className="mt-16 text-lg">
          <BlackButton>
            Yes I am, let's start
          </BlackButton>
        </button>
      </motion.div>
    </div>
  )
}