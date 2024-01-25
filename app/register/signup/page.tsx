import SignupForm from "@/components/specifics/signupForm";

export default function Signup() {
  return (
    <main>
      <div className="text-center mt-36">
        <h1 className="text-4xl sm:text-5xl font-semibold">Sign up for Ziggy</h1>
        <p className="mt-6 text-slate-800">Create your free Ziggy account, no credit card required.</p>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}