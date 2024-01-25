export default function WhiteButton({ children } : { children: React.ReactNode }) {
  return (
    <div className="p-2 text-black font-medium rounded border hover:bg-transparent hover:border-black transition-all">
      {children}
    </div>
  )
}