import Image from "next/image"
import Link from "next/link"

import HoverWords from "@/components/generics/hoverWords"
import WhiteButton from "@/components/generics/whiteButton"

import { MdOutlineEmail } from "react-icons/md"


export default async function Footer() {

  const info = [
    {
      title: "Product",
      links: [
        {
          name: "Features",
          href: "/info/features"
        },
        {
          name: "Pricing",
          href: "/info/pricing"
        },
        {
          name: "Changelog",
          href: "/info/changelog"
        },
        {
          name: "Open Source",
          href: "https://www.github.com/oustro/ziggy"
        }
      ]
    },
    {
      title: "Company",
      links: [
        {
          name: "About",
          href: "https://www.oustro.xyz"
        },
        {
          name: "Careers",
          href: "https://www.oustro.xyz"
        },
        {
          name: "Blog",
          href: "/info/blog"
        },
        {
          name: "Contact",
          href: "/info/contact"
        }
      ]
    },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy",
          href: "/info/legal/privacy"
        },
        {
          name: "Terms",
          href: "/info/legal/tos"
        }
      ]
    }
  ]

  return (
    <nav className="bottom-0 z-0 text-sm bottom-0 mt-36 w-full backdrop-blur from-white-50 border-t pt-10 px-24 flex items-start justify-between">
      <div>
        <Link className="flex items-center gap-1" href="/">
          <Image
          src="/ziggy-logo.svg"
          alt="Logo"
          width={40}
          height={40}
          />
          <h4 className="text-lg font-semibold">Ziggy</h4>
        </Link>
        <div className="mt-8 text-slate-600">
          <p className="font-medium">© 2024 Oustro, LLC</p>
          <p className="mb-4">Made with a 🤠 in Texas</p>
          <Link href="mailto:howdy@useziggy.com">
            <WhiteButton>
              <span className="flex items-center gap-1"><MdOutlineEmail /> howdy@useziggy.com</span>
            </WhiteButton>
          </Link>
        </div>
      </div>
      <div className="flex items-start gap-12 text-slate-600">
        {info.map((section, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h4 className="font-semibold">{section.title}</h4>
            {section.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <HoverWords>{link.name}</HoverWords>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}