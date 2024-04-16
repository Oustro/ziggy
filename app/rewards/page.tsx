import { verifyKey } from "@unkey/api";

type Props = {
  params: { teamid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Rewards({ params, searchParams } : Props ) {
  if (!searchParams.token || !searchParams.id) {
    return (
      <main className="h-screen flex justify-center px-4 items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">Missing Reward Info!</h1>
        </div>
      </main>
    )
  }

  const { result, error } = await verifyKey({
    key: searchParams.token as string,
    apiId: process.env.UNKEY_API_ID as string,
  });

  if (error) {
    return (
      <main className="h-screen flex justify-center px-4 items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">An error occured fetching your reward</h1>
        </div>
      </main>
    )
  }

  if (!result.valid || searchParams.id !== result.ownerId || result.remaining === 0) {
    return (
      <main className="h-screen flex justify-center px-4 items-center text-center">
        <div>
          <h1 className="text-4xl font-medium">This is not a valid token</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex justify-center px-4 items-center text-center">
      <div>
        <h1 className="text-4xl font-medium">Congrats! Your reward is: {process.env.REWARD}</h1>
        <p className="mt-8">{result?.meta?.description as string ?? ""}</p>
      </div>
    </main>
  )
}
