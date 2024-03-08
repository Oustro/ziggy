import RegisterNav from "@/components/specifics/navbars/registerNav"

export default function Sorry() {
  return (
    <>
      <div className="absolute">
        <RegisterNav />
      </div>
      <main className="h-screen flex justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">Sorry, but this interview has reached max capacity.</h1>
          <h1 className="text-xl text-slate-600 mt-4">Please let whoever asked you to complete this interview know.</h1>
        </div>
      </main>
    </>
  )
}