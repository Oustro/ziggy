import QRCode from "react-qr-code";

import BlackButton from "@/components/generics/blackButton";

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

  return (
    <div>
      <h1 className="text-4xl font-semibold">Distribute</h1>
      <div className="mt-8">
        <h3 className="text-2xl font-medium">QR Code</h3>
      <p className="mt-2 text-slate-600">Scan the this QR to take your Ziggy Interview. Great for printing and sharing too.</p>
        <QRCode id="QRCode" className="rounded p-2 border border-slate-600 mt-6" value={window.location.origin + '/zy/'+externalId} />
        <button className="mt-6" onClick={downloadQR}>
          <BlackButton>
            Download QR Code
          </BlackButton>
        </button>
      </div>
    </div>
  )
}
