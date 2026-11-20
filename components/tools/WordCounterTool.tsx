"use client";
import { useState } from "react";
import { btn2, card, input } from "./ui";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const t = text.trim();
  const words = t ? t.split(/\s+/).length : 0;
  const paragraphs = t ? t.split(/\n+/).filter((p) => p.trim()).length : 0;
  const stats: [string, number | string][] = [["Palabras", words], ["Caracteres", text.length], ["Sin espacios", text.replace(/\s/g, "").length], ["Párrafos", paragraphs], ["Lectura", words ? `${Math.max(1, Math.round(words / 200))} min` : "0 min"]];
  const copy = async () => { try { await navigator.clipboard.writeText(text); setMsg("Texto copiado."); } catch { setMsg("No se pudo copiar. Selecciona el texto manualmente."); } };
  return (
    <div className={card}>
      <dl className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5" aria-live="polite">
        {stats.map(([k, v]) => <div key={k} className="rounded-2xl bg-bg p-3 text-center"><dd className="font-display text-2xl font-bold text-brand">{v}</dd><dt className="text-xs text-muted">{k}</dt></div>)}
      </dl>
      <label htmlFor="texto" className="sr-only">Tu texto</label>
      <textarea id="texto" value={text} onChange={(e) => { setText(e.target.value); setMsg(""); }} rows={10} placeholder="Escribe o pega tu texto aquí…" className={input} />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button className={btn2} onClick={copy} disabled={!text}>Copiar texto</button>
        <button className={btn2} onClick={() => { setText(""); setMsg("Texto borrado."); }} disabled={!text}>Borrar</button>
        <span aria-live="polite" className="text-sm text-muted">{msg}</span>
      </div>
    </div>
  );
}
