import LoginForm from "@/components/specifics/loginForm";

export default function Login() {
  return (
    <main>
      <div className="text-center mt-36">
        <h1 className="text-4xl sm:text-5xl font-semibold">Login to Ziggy</h1>
        <p className="mt-6 text-slate-800">Welcome back, we're glad you're here.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}