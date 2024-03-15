import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

import Link from "next/link"

import { IoSettingsOutline } from "react-icons/io5"

import { usePathname } from "next/navigation"

export default function InterviewNav({ setView, interviewName, checkReponseView } : { setView: Function, interviewName: string, checkReponseView: number }) {
  const pathname = usePathname()

  return (
    <>
      <nav className={`hidden sticky text-sm top-0 z-10 w-full bg-white h-16 border-b px-6 sm:flex items-center ${checkReponseView === 3 ? 'justify-end' : 'justify-between'}`}>
        {checkReponseView !== 3 && (
          <div className="flex items-center gap-4">
            <h1 className="font-medium">{interviewName}</h1>
            <h1 className="font-medium">/</h1>
            <div className="flex gap-6 ml-2">
              <button onClick={() => setView(0)}>
                <HoverWords>Overview</HoverWords>
              </button>
              <button onClick={() => setView(1)}>
                <HoverWords>Results</HoverWords>
              </button>
              <button onClick={() => setView(2)}>
                <HoverWords>Transcripts</HoverWords>
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-6">
          <button onClick={() => setView(3)}>
            <HoverWords>Distribute</HoverWords>
          </button>
          <Link href={pathname+"/edit"}>
            <BlackButton><span className="flex items-center gap-2"><IoSettingsOutline /> Settings</span></BlackButton>
          </Link>
        </div>
      </nav>
      <nav className={`sm:hidden sticky text-sm top-16 z-10 w-full bg-white border-b p-6 items-center ${checkReponseView === 3 ? 'justify-end' : 'justify-between'}`}>
          <div className="flex items-center gap-4">
            <h1 className="font-medium">{interviewName}</h1>
            <h1 className="font-medium">/</h1>
            <div className="flex gap-6 ml-2 overflow-scroll">
              {checkReponseView !== 3 && (
                <>
                <button onClick={() => setView(0)}>
                  <HoverWords>Overview</HoverWords>
                </button>
                <button onClick={() => setView(1)}>
                  <HoverWords>Results</HoverWords>
                </button>
                <button onClick={() => setView(2)}>
                  <HoverWords>Transcripts</HoverWords>
                </button>
                </>
              )}
              <button onClick={() => setView(3)}>
                <HoverWords>Distribute</HoverWords>
              </button>
              <Link href={pathname+"/edit"}>
                <BlackButton><span className="flex items-center gap-2"><IoSettingsOutline /> Settings</span></BlackButton>
              </Link>
            </div>
          </div>
      </nav>
    </>
  )
}