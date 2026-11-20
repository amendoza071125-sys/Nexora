"use client";
import { useEffect, useState } from "react";
import { btn, btn2, card } from "./ui";

const SETS = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", num: "0123456789", sym: "!@#$%^&*()-_=+[]{};:,.<>?" };
const LABELS: Record<keyof typeof SETS, string> = { lower: "Minúsculas", upper: "Mayúsculas", num: "Números", sym: "Símbolos" };
const rnd = (max: number) => { const lim = Math.floor(2 ** 32 / max) * max, a = new Uint32Array(1); do crypto.getRandomValues(a); while (a[0] >= lim); return a[0] % max; };

export default function PasswordTool() {
  const [len, setLen] = useState(16);
  const [on, setOn] = useState({ lower: true, upper: true, num: true, sym: true });
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const chosen = (Object.keys(SETS) as (keyof typeof SETS)[]).filter((k) => on[k]);
  const pool = chosen.map((k) => SETS[k]).join("");

  const generate = () => {
    if (!chosen.length) { setPw(""); setMsg("Elige al menos un tipo de carácter."); return; }
    const chars = chosen.map((k) => SETS[k][rnd(SETS[k].length)]);
    while (chars.length < len) chars.push(pool[rnd(pool.length)]);
    for (let i = chars.length - 1; i > 0; i--) { const j = rnd(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    setPw(chars.join("")); setMsg("");
  };
  useEffect(generate, [len, on]); // eslint-disable-line react-hooks/exhaustive-deps

  const bits = pool ? len * Math.log2(pool.length) : 0;
  const level = bits < 50 ? ["Débil", "bg-red-500", 1] : bits < 70 ? ["Media", "bg-amber-500", 2] : bits < 100 ? ["Fuerte", "bg-green-500", 3] : ["Muy fuerte", "bg-emerald-600", 4];
  const copy = async () => { try { await navigator.clipboard.writeText(pw); setMsg("Contraseña copiada."); } catch { setMsg("No se pudo copiar. Selecciónala manualmente."); } };

  return (
    <div className={`${card} mx-auto max-w-xl`}>
      <output className="block break-all rounded-2xl bg-navy p-4 font-mono text-xl text-white" aria-live="polite">{pw || "—"}</output>
      <div className="mt-2 flex items-center gap-2 text-sm" aria-label={`Seguridad: ${level[0]}`}>
        <div className="flex gap-1">{[1, 2, 3, 4].map((i) => <span key={i} className={`h-2 w-8 rounded-full ${i <= (level[2] as number) ? level[1] : "bg-line"}`} />)}</div><span className="text-muted">{level[0]}</span>
      </div>
      <label className="mt-5 block text-sm font-medium">Longitud: {len}
        <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(+e.target.value)} className="mt-2 w-full accent-brand" />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {chosen.length >= 0 && (Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
          <label key={k} className="flex items-center gap-2 rounded-xl border border-line p-3 text-sm"><input type="checkbox" checked={on[k]} onChange={(e) => setOn({ ...on, [k]: e.target.checked })} className="h-4 w-4 accent-brand" />{LABELS[k]}</label>
        ))}
      </div>
      <div className="mt-5 flex gap-3"><button className={btn} onClick={generate}>Generar otra</button><button className={btn2} onClick={copy} disabled={!pw}>Copiar</button></div>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-muted">{msg || "Se genera en tu dispositivo; nunca se envía ni se guarda."}</p>
    </div>
  );
}
