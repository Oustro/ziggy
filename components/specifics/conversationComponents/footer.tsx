import Link from "next/link"
import Image from "next/image"

export default function Footer({external} : {external: string}) {

  return (
    <div className="absolute bottom-0 text-sm pb-2 text-center w-full">
      <div className="flex items-center justify-center gap-2">
        <p>Powered by</p>
        <Link href="/dashboard" className="flex items-center gap-1">
          <Image
          src="/ziggy-logo.svg"
          alt="Ziggy Logo"
          width={30}
          height={30}
          />
          <p className="font-semibold">Ziggy</p>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <Link href="/info/legal/privacy" target="_blank">
          <p className="underline">Privacy Policy</p>
        </Link>
        <Link href="/info/legal/tos" target="_blank">
          <p className="underline">Terms of Service</p>
        </Link>
        <Link href={"/info/contact?reason=Report an interview ID: "+external} target="_blank">
          <p className="underline">Report this interview</p>
        </Link>
      </div>
    </div>
  )
}