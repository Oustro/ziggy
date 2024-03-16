import Flow from "@/components/specifics/authComponents/flow"

export default function Signup() {
  return (
    <main>
      <div className="text-center mt-24 px-6">
        <h1 className="text-4xl sm:text-5xl font-semibold">Sign up for Ziggy</h1>
        <Flow authType={1} />
      </div>
    </main>
  )
}