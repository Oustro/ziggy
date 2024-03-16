import { NextRequest } from 'next/server'

import RegisterNav from "@/components/specifics/navbars/registerNav"

export default function Sorry(request: NextRequest & { searchParams: { errortype: number }}) {
  return (
    <>
      <div className="absolute">
        <RegisterNav />
      </div>
      <main className="h-screen px-4 flex justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">{request.searchParams.errortype === 1 ?
            "Sorry, an error occurred adding you to this team." :
            "Sorry, but this team has reach max capacity."
          }</h1>
          <h1 className="text-xl text-slate-600 mt-4">Please let whoever sent you this invite know.</h1>
        </div>
      </main>
    </>
  )
}