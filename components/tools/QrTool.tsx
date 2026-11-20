"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { btn, card, input } from "./ui";

const lum = (hex: string) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };

export default function QrTool() {
  const [text, setText] = useState("https://");
  const [fg, setFg] = useState("#0A1330");
  const [bg, setBg] = useState("#ffffff");
  const [msg, setMsg] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const value = text.trim();
  const lowContrast = Math.abs(lum(fg) - lum(bg)) < 0.4;

  useEffect(() => {
    if (!value || !canvas.current) return;
    QRCode.toCanvas(canvas.current, value, { width: 256, margin: 2, color: { dark: fg, light: bg } }).catch(() => setMsg("El texto es demasiado largo para un código QR."));
  }, [value, fg, bg]);

  const download = async () => {
    try {
      const url = await QRCode.toDataURL(value, { width: 1024, margin: 2, color: { dark: fg, light: bg } });
      const a = document.createElement("a"); a.href = url; a.download = "nexora-qr.png"; a.click();
      setMsg("QR descargado como nexora-qr.png.");
    } catch { setMsg("No se pudo generar el QR. Acorta el texto e inténtalo de nuevo."); }
  };

  return (
    <div className={`${card} grid gap-6 md:grid-cols-2`}>
      <div className="space-y-4">
        <label className="block text-sm font-medium">Enlace o texto
          <textarea value={text} onChange={(e) => { setText(e.target.value); setMsg(""); }} rows={4} className={`${input} mt-1`} />
        </label>
        <div className="flex gap-4">
          <label className="text-sm font-medium">Color del QR<input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="mt-1 block h-11 w-20 rounded-lg border border-line bg-bg" /></label>
          <label className="text-sm font-medium">Fondo<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 block h-11 w-20 rounded-lg border border-line bg-bg" /></label>
        </div>
        {lowContrast && <p className="text-sm text-amber-600" role="alert">Poco contraste: algunos lectores no podrán escanear este QR. Usa un color de QR más oscuro que el fondo.</p>}
      </div>
      <div className="flex flex-col items-center gap-4">
        {value ? <canvas ref={canvas} width={256} height={256} aria-label="Vista previa del código QR" className="h-64 w-64 rounded-2xl border border-line" />
          : <div className="grid h-64 w-64 place-items-center rounded-2xl border border-dashed border-line p-4 text-center text-sm text-muted">Escribe un enlace o texto para ver tu QR.</div>}
        <button className={btn} disabled={!value} onClick={download}>Descargar PNG</button>
        <p aria-live="polite" className="min-h-5 text-sm text-muted">{msg}</p>
      </div>
    </div>
  );
}
