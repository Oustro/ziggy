import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

export default function InterviewNav({ setView, interviewName } : { setView: Function, interviewName: string }) {

  return (
    <nav className="sticky text-sm top-0 z-10 w-full bg-white h-16 border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-medium">{interviewName}</h1>
        <h1 className="font-medium">/</h1>
        <div className="flex gap-6 ml-2">
          <button onClick={() => setView(0)}>
            <HoverWords>Overview</HoverWords>
          </button>
          <button onClick={() => setView(1)}>
            <HoverWords>Ask Ziggy</HoverWords>
          </button>
          <button onClick={() => setView(2)}>
            <HoverWords>Search</HoverWords>
          </button>
          <button onClick={() => setView(3)}>
            <HoverWords>Transcripts</HoverWords>
          </button>
        </div>
      </div>
      <div className="flex gap-6">
        <button onClick={() => setView(4)}>
          <HoverWords>Distribute</HoverWords>
        </button>
        <button onClick={() => setView(5)}>
          <BlackButton>Edit Interview</BlackButton>
        </button>
      </div>
    </nav>
  )
}