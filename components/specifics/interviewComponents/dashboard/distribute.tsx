import QRCode from "react-qr-code"

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from "@/components/generics/whiteButton";

import { FaXTwitter, FaLinkedinIn, FaFacebook, FaCopy } from "react-icons/fa6"

import Link from "next/link"

export default function Distribute({ externalId, interviewName } : { externalId: string, interviewName: string }) {

    function downloadQR() {
    const svg = document.getElementById("QRCode");
    const svgData = svg ? new XMLSerializer().serializeToString(svg) : '';
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${interviewName.replace(/[.\s]/g, '_') + '_QRCode'}`;;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  function copyLink() {
    navigator.clipboard.writeText("https://www.useziggy.com/zy/"+externalId)
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">Distribute</h1>
      <div className="mt-8">
        <h3 className="text-2xl font-medium">Interview link</h3>
        <p className="mt-2 text-slate-600">Share this link with whoever you would like to take your interview.</p>
        <button onClick={copyLink} type="button" className="border text-sm mt-4 py-1 px-2 flex rounded hover:border-inherit transition-all border-slate-600 items-center gap-2">
          <FaCopy />
          <p className="truncate">https://www.useziggy.com/zy/{externalId}</p>
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-medium">QR Code</h3>
        <p className="mt-2 text-slate-600">Scan the this QR to take your Ziggy Interview. Great for printing and sharing too.</p>
        <QRCode id="QRCode" className="rounded p-2 border border-slate-600 mt-6" value={'https://www.useziggy.com/zy/'+externalId} />
        <button className="mt-6" onClick={downloadQR}>
          <BlackButton>
            Download QR Code
          </BlackButton>
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-medium">Share on social</h3>
        <p className="mt-2 text-slate-600">Post your Ziggy interview link on social media.</p>
        <div className="flex mt-6 gap-4 text-2xl">
          <Link href={"https://twitter.com/intent/tweet?text=https://www.useziggy.com/zy/"+externalId} target="_blank">
            <WhiteButton><FaXTwitter /></WhiteButton>
          </Link>
          <Link href={"https://www.linkedin.com/shareArticle?url=https://www.useziggy.com/zy/"+externalId} target="_blank">
            <WhiteButton><FaLinkedinIn /></WhiteButton> 
          </Link>
          <Link href={"https://www.facebook.com/sharer/sharer.php?u=https://www.useziggy.com/zy/"+externalId} target="_blank">
            <WhiteButton><FaFacebook /></WhiteButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
