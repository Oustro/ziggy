import Flow from "@/components/specifics/authComponents/flow"

import Link from "next/link"

export default function Login() {
  return (
    <main>
      <div className="text-center mt-24 px-6">
        <h1 className="text-4xl sm:text-5xl font-semibold">Login to Ziggy</h1>
        <Flow authType={0} />
      </div>
    </main>
  )
}