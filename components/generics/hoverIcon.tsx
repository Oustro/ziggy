export default function HoverIcon({ children } : { children: React.ReactNode }) {
  return (
    <div className="text-slate-600 hover:text-black hover:bg-slate-200 rounded transition p-1">
      {children}
    </div>
  )
}