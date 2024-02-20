export default function Trends({ data } : { data: number[] }) {
  return (
    <div className="w-[50%] rounded p-6 border border-slate-600">
      <h3 className="text-2xl font-medium">Key Trends</h3>
      <p className="mt-2">This metric shows what people are talking about the most and returns the keywords mentioned in the interview.</p>

    </div> 
  )
}