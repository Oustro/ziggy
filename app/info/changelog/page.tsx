import Link from "next/link"

export default async function Changelog() {
  const responseGitHubReleases = await fetch("https://api.github.com/repos/oustro/ziggy/releases", {
    cache: "no-store"
  })

  const data = await responseGitHubReleases.json()

  return (
    <main>
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Changelog</h1>
      <p className="text-slate-600 mt-6 text-center">All of Ziggy's latest updates and changes. Check out the code <Link href="https://git.new/interview" className="underline">here.</Link></p>
      <div className="w-[80%] grid grid-cols-4 gap-4 mx-auto">
        {data.map((release: any, index: number) => (
          <Link href={release.html_url} key={index}>
            <div className="group mt-8 border p-6 rounded hover:border-slate-600 transition">
              <h2 className="text-2xl font-semibold">{release.name}</h2>
              <p className="group-hover:translate-x-1 transition text-xs mt-4">View release &rsaquo;</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}