export default function HoverWords({ children } : { children: React.ReactNode }) {
  return (
    <p className="text-slate-800 hover:text-black transition">{children}</p>
  )
}