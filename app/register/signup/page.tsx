import SignupForm from "@/components/specifics/signupForm"

import Link from "next/link"

export default function Signup() {
  return (
    <main>
      <div className="text-center mt-36">
        <h1 className="text-4xl sm:text-5xl font-semibold">Sign up for Ziggy</h1>
        <p className="mt-6 text-slate-800">Create your free Ziggy account, no credit card required.</p>
        <div className="mt-8">
          <SignupForm />
        </div>
        <p className="mt-12 text-slate-800 text-xs">By continuing, you agree to the <Link className="underline" href="/info/legal">Terms of Service and Privacy Policy.</Link></p>
      </div>
    </main>
  )
}