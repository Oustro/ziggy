export default function Profile({ color } : { color: boolean }) {
  return color ? (
    <div className="rounded-full h-8 w-8 bg-gradient-to-r from-gray-900 to-indigo-400" />
  ) : (
    <div className="rounded-full h-8 w-8 border border-slate-600" />
  )
}