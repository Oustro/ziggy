"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import BlackButton from "@/components/generics/blackButton"

export default function Contact() {
  const searchParams = useSearchParams()

  const [reason, setReason] = useState(searchParams.get("reason") || "General")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [comments, setComments] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await fetch("/api/general/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: name, 
        email: email, 
        reason: reason,
        comments: comments
      })
    })

    setReason("General")
    setName("")
    setComments("")
    return setEmail("")
  }

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Contact us</h1>
      <p className="text-slate-600 mt-6 text-center">Get in touch with our sales, support, and safety teams (yes, we read everything).</p>
      <form onSubmit={handleSubmit} className="w-[40%] mx-auto mt-8">
        <div className="text-left font-medium text-sm pb-1">
          <label><span className="text-red-600">*</span> Email</label>
        </div>
        <input
        type="email"
        value={email}
        className="w-full mt-1 border-b border-slate-600 pb-2 text-base focus:outline-none"
        placeholder="Enter your email address..."
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <div className="text-left font-medium text-sm pb-1 mt-6">
          <label><span className="text-red-600">*</span> Name</label>
        </div>
        <input
        type="text"
        value={name}
        className="w-full mt-1 border-b border-slate-600 pb-2 text-base focus:outline-none"
        placeholder="Enter your name..."
        onChange={(e) => setName(e.target.value)}
        required
        />
        <div className="text-left font-medium text-sm pb-1 mt-6">
          <label><span className="text-red-600">*</span> Reason</label>
        </div>
        <input
        type="text"
        value={reason}
        className="w-full mt-1 border-b border-slate-600 pb-2 text-base focus:outline-none"
        placeholder="Enter your reason for contact..."
        onChange={(e) => setReason(e.target.value)}
        required
        />
         <div className="text-left font-medium text-sm pb-1 mt-6">
          <label>Additional Comments</label>
        </div>
        <textarea
        className="w-full mt-1 resize-y border border-slate-600 rounded p-2 text-base focus:outline-none"
        placeholder="Enter any comments you have..."
        rows={4}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        required
        />
        <button className="w-full mt-6" type="submit">
          <BlackButton>Submit</BlackButton>
        </button>
      </form>
    </main>
  )
}