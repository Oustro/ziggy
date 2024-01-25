export default function BlackButton({ children } : { children: React.ReactNode }) {
  return (
    <div className="p-2 bg-black text-white font-medium rounded border hover:bg-transparent hover:text-black border-black transition-all">
      {children}
    </div>
  )
}