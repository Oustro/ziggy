"use client"

import { useState } from "react"

import { GiHamburgerMenu } from "react-icons/gi"
import { IoCloseSharp } from "react-icons/io5"
import { VscLinkExternal } from "react-icons/vsc"

import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import WhiteButton from "@/components/generics/whiteButton"
import BlackButton from "@/components/generics/blackButton"


export default function HomeList() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <BlackButton>
          {open ? 
            <IoCloseSharp /> 
          :
            <GiHamburgerMenu />
          }
        </BlackButton>
      </button>
      {open && (
        <div className="absolute top-16 p-8 text-lg left-0 w-full h-screen bg-white">
          <div className="grid grid-cols-1 items-center gap-6">
            <Link href="/info/features" onClick={() => setOpen(false)}>
              <HoverWords>Features</HoverWords>
            </Link>
            <Link href="/info/blog" onClick={() => setOpen(false)}>
              <HoverWords>Blog</HoverWords>
            </Link>
            <Link href="/info/changelog" onClick={() => setOpen(false)}>
              <HoverWords>Changelog</HoverWords>
            </Link>
            <Link href="/info/pricing" onClick={() => setOpen(false)}>
              <HoverWords>Pricing</HoverWords>
            </Link>
            <Link target="_blank" href="https://www.github.com/oustro/ziggy">
              <HoverWords><span className="flex items-center gap-1">GitHub <VscLinkExternal /></span></HoverWords>
            </Link>
            <Link href="/register/login" className="text-center">
              <WhiteButton>Login</WhiteButton>
            </Link>
            <Link href="/register/signup" className="text-center">
              <BlackButton>Try Ziggy for Free</BlackButton>
            </Link>
          </div>
        </div>
      )}  
    </>
  )
}