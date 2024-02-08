import Link from "next/link"
import Image from "next/image"

export default function Footer() {

  return (
    <div className="absolute bottom-0 h-24 text-center w-full">
      <div className="flex items-center justify-center gap-2">
        <p>Powered by</p>
        <Link href="/dashboard" className="flex items-center gap-1">
          <Image
          src="/ziggy-logo.svg"
          alt="Ziggy Logo"
          width={40}
          height={40}
          />
          <p className="text-lg font-semibold">Ziggy</p>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <Link href="/info/legal" target="_blank">
          <p className="underline">Privacy Policy</p>
        </Link>
        <Link href="/info/legal" target="_blank">
          <p className="underline">Terms of Service</p>
        </Link>
        <Link href="/info/contact" target="_blank">
          <p className="underline">Contact Us</p>
        </Link>
      </div>
    </div>
  )
}