import LoginForm from "@/components/specifics/loginForm"

import Link from "next/link"

export default function Login() {
  return (
    <main>
      <div className="text-center mt-36">
        <h1 className="text-4xl sm:text-5xl font-semibold">Login to Ziggy</h1>
        <p className="mt-6 text-slate-800">Welcome back, we're glad you're here.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-12 text-slate-800 text-xs">Don't have a Ziggy account? <Link className="underline" href="/register/signup">Create one.</Link></p>
      </div>
    </main>
  )
}