export default function Ask() {

  return (
    <div>
      <h1 className="text-4xl font-semibold">Ask Ziggy</h1>
      <p className="mt-2">Ziggy has collected data from your interviewees and is ready to answer any questions you may have.</p>
      <form className="mt-8 w-full">
        <input
        type="text"
        className="w-[60%] mt-4 border-b border-slate-600 pb-2 text-base focus:outline-none"
        placeholder="Enter a question about your interview for Ziggy..."
        required
        />
      </form>
    </div>
  )
}