export default function Badge({ children } : { children: React.ReactNode }) {
  return (
    <div className="text-slate-600 px-3 border-slate-600 flex items-center border rounded-full">
      {children}
    </div>
  )
}