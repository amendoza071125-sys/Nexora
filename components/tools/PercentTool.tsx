"use client";
import { useState } from "react";
import { card, input } from "./ui";

const n = (s: string) => (s.trim() === "" ? NaN : parseFloat(s.replace(",", ".")));
const f = (x: number) => x.toLocaleString("es", { maximumFractionDigits: 2 });
const Num = ({ label, v, set }: { label: string; v: string; set: (s: string) => void }) => (
  <label className="block text-sm font-medium">{label}<input inputMode="decimal" value={v} onChange={(e) => set(e.target.value)} className={`${input} mt-1`} /></label>
);
const Res = ({ children }: { children: React.ReactNode }) => <p className="mt-4 rounded-2xl bg-navy p-4 font-display text-xl font-bold text-white" aria-live="polite">{children}</p>;

export default function PercentTool() {
  const [a1, setA1] = useState(""), [b1, setB1] = useState("");
  const [a2, setA2] = useState(""), [b2, setB2] = useState("");
  const [a3, setA3] = useState(""), [b3, setB3] = useState("");
  const r1 = (n(a1) / 100) * n(b1);
  const r2 = (n(a2) / n(b2)) * 100;
  const save = (n(a3) * n(b3)) / 100;
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <section className={card}><h2 className="mb-3 font-display text-lg font-semibold">¿Cuánto es el X % de Y?</h2>
        <div className="space-y-3"><Num label="Porcentaje (%)" v={a1} set={setA1} /><Num label="Cantidad" v={b1} set={setB1} /></div>
        {Number.isFinite(r1) ? <Res>{f(n(a1))} % de {f(n(b1))} = {f(r1)}</Res> : <p className="mt-4 text-sm text-muted">Completa los dos campos para ver el resultado.</p>}</section>
      <section className={card}><h2 className="mb-3 font-display text-lg font-semibold">¿Qué porcentaje es X de Y?</h2>
        <div className="space-y-3"><Num label="Valor (X)" v={a2} set={setA2} /><Num label="Total (Y)" v={b2} set={setB2} /></div>
        {Number.isFinite(r2) ? <Res>{f(n(a2))} es el {f(r2)} % de {f(n(b2))}</Res> : <p className="mt-4 text-sm text-muted">Indica un total distinto de cero.</p>}</section>
      <section className={card}><h2 className="mb-3 font-display text-lg font-semibold">Descuento</h2>
        <div className="space-y-3"><Num label="Precio original" v={a3} set={setA3} /><Num label="Descuento (%)" v={b3} set={setB3} /></div>
        {Number.isFinite(save) ? <Res>Ahorras {f(save)}. Pagas {f(n(a3) - save)}.</Res> : <p className="mt-4 text-sm text-muted">Escribe el precio y el descuento.</p>}</section>
    </div>
  );
}
