"use client";
import { useState } from "react";
import { card, input } from "./ui";

const groups: Record<string, Record<string, number>> = {
  Longitud: { Metro: 1, Kilómetro: 1000, Centímetro: 0.01, Milímetro: 0.001, Milla: 1609.344, Yarda: 0.9144, Pie: 0.3048, Pulgada: 0.0254 },
  Peso: { Kilogramo: 1, Gramo: 0.001, Miligramo: 1e-6, Tonelada: 1000, Libra: 0.45359237, Onza: 0.028349523125 },
  Volumen: { Litro: 1, Mililitro: 0.001, "Metro cúbico": 1000, "Galón (EE. UU.)": 3.785411784, Taza: 0.2365882365, "Onza líquida": 0.0295735295625 },
  Temperatura: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
};
const toC = (v: number, u: string) => (u === "Fahrenheit" ? ((v - 32) * 5) / 9 : u === "Kelvin" ? v - 273.15 : v);
const fromC = (v: number, u: string) => (u === "Fahrenheit" ? (v * 9) / 5 + 32 : u === "Kelvin" ? v + 273.15 : v);

export default function UnitTool() {
  const [cat, setCat] = useState("Longitud");
  const names = Object.keys(groups[cat]);
  const [from, setFrom] = useState("Metro");
  const [to, setTo] = useState("Kilómetro");
  const [val, setVal] = useState("1");
  const pick = (c: string) => { const n = Object.keys(groups[c]); setCat(c); setFrom(n[0]); setTo(n[1]); };
  const v = parseFloat(val.replace(",", "."));
  const out = !Number.isFinite(v) ? NaN : cat === "Temperatura" ? fromC(toC(v, from), to) : (v * groups[cat][from]) / groups[cat][to];
  const sel = (value: string, set: (s: string) => void, label: string) => (
    <label className="block text-sm font-medium">{label}
      <select value={value} onChange={(e) => set(e.target.value)} className={`${input} mt-1`}>{names.map((n) => <option key={n}>{n}</option>)}</select>
    </label>
  );
  return (
    <div className={card}>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Tipo de medida">
        {Object.keys(groups).map((c) => <button key={c} onClick={() => pick(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${cat === c ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{c}</button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_1fr] sm:items-end">
        <label className="block text-sm font-medium">Valor<input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} className={`${input} mt-1`} /></label>
        {sel(from, setFrom, "De")}
        <button onClick={() => { setFrom(to); setTo(from); }} aria-label="Intercambiar unidades" className="h-12 rounded-xl border border-line px-4 hover:border-brand">⇄</button>
        {sel(to, setTo, "A")}
      </div>
      <p className="mt-5 rounded-2xl bg-navy p-4 font-display text-xl font-bold text-white" aria-live="polite">
        {Number.isFinite(out) ? `${v.toLocaleString("es")} ${from} = ${parseFloat(out.toPrecision(10)).toLocaleString("es", { maximumFractionDigits: 8 })} ${to}` : "Escribe un número para convertir."}
      </p>
    </div>
  );
}
