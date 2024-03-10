import { FaCheck } from "react-icons/fa"

export default function Pricing() {

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Pricing Plans</h1>
      <p className="text-slate-600 mt-6 text-center">An affordable, simple pricing model to help you get the most out of your feedback with Ziggy.</p>
      <div className="w-full px-12 grid gap-8 grid-cols-3 mt-12">
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-semibold">Free Plan</h2>
          <h1 className="text-3xl mt-4 font-medium">$0 / month</h1>
          <p className="text-slate-600 mt-4 pb-4 border-b">The Free plan is made for teams who want to get try Ziggy without commitment.</p>
          <ul className="grid gap-3 mt-8">
            <li className="flex items-center font-medium gap-3"><FaCheck /> 3 interview templates</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 25 AI interviews / template</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> 1 team member</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Community support</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Community support</li>
            <li className="flex items-center font-medium gap-3"><FaCheck /> Community support</li>
          </ul>
        </div>
        <div className="bg-green-400">
          hi
        </div>
        <div>
          hi
        </div>
      </div>
    </main>
  )
}