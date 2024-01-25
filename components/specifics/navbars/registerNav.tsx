import Image from "next/image"
import Link from "next/link"

export default function RegisterNav() {
  return (
    <nav className="top-0 w-full h-16 px-6 flex">
      <Link className="flex items-center gap-1" href="/">
        <Image
        src="/ziggy-logo.svg"
        alt="Logo"
        width={42}
        height={42}
        />
        <h4 className="text-lg font-semibold">Ziggy</h4>
      </Link>
    </nav>
  )
}