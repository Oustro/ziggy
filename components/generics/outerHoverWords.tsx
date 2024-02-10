export default function OuterHoverWords({ children } : { children: React.ReactNode }) {
  return (
    <div className="text-slate-600 hover:text-black transition">{children}</div>
  )
}