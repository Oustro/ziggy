import Image from "next/image"

export default function OgImage({ id }: { id: string }) {
  return (
    <Image
    src={`https://www.useziggy.com/zy/${id}/opengraph-image`}
    alt="An image asking to take an interview on useziggy.com"
    width={1200}
    height={630}
    className="rounded-t border-slate-600 border-t border-x"
    />
  )
}