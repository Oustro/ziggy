import { NextRequest } from 'next/server'

import RegisterNav from "@/components/specifics/navbars/registerNav"

type Props = {
  params: {}
  searchParams: { errortype: string }
}

export default function Sorry({ params, searchParams } : Props ) {  
  return (
    <>
      <div className="absolute">
        <RegisterNav />
      </div>
      <main className="h-screen px-4 flex justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">
          {searchParams.errortype === "invalid" ?
            "Sorry, an error occurred adding you to this team." 
          :
            "Sorry, but this team has reach max capacity."
          }
          </h1>
          <h1 className="text-xl text-slate-600 mt-4">Please let whoever sent you this invite know.</h1>
        </div>
      </main>
    </>
  )
}