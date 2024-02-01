import TeamCards from "@/components/specifics/teamComponents/cards/teamCards"

export default async function Dashboard() {

  return (
    <main>
      <h1 className="text-4xl font-semibold mt-16 ml-12">Current Teams</h1>
      <TeamCards />
    </main>
  )
}
