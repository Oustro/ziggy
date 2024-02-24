import HoverWords from "@/components/generics/hoverWords"
import BlackButton from "@/components/generics/blackButton"

export default function InterviewNav({ setView, interviewName, checkReponseView } : { setView: Function, interviewName: string, checkReponseView: number }) {

  return (
    <nav className={`sticky text-sm top-0 z-10 w-full bg-white h-16 border-b px-6 flex items-center ${checkReponseView === 4 ? 'justify-end' : 'justify-between'}`}>
      {checkReponseView !== 4 && (
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
        <button onClick={() => setView(4)}>
          <BlackButton>Edit Interview</BlackButton>
        </button>
      </div>
    </nav>
  )
}