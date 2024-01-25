export default function HoverWords({ children } : { children: React.ReactNode }) {
  return (
    <p className="text-slate-600 hover:text-black transition">{children}</p>
  )
}