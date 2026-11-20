"use client";
import { useState } from "react";
import { card } from "./ui";

type Op = "+" | "−" | "×" | "÷";
const fmt = (n: number) => (Number.isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Error");
const calc = (a: number, b: number, o: Op) => (o === "+" ? a + b : o === "−" ? a - b : o === "×" ? a * b : b === 0 ? NaN : a / b);

export default function CalculatorTool() {
  const [cur, setCur] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  const [fresh, setFresh] = useState(false);
  const reset = () => { setCur("0"); setPrev(null); setOp(null); setFresh(false); };

  const digit = (d: string) => {
    if (cur === "Error" || fresh) { setCur(d === "." ? "0." : d); setFresh(false); return; }
    if (d === "." && cur.includes(".")) return;
    setCur(cur === "0" && d !== "." ? d : cur + d);
  };
  const operator = (o: Op) => {
    if (cur === "Error") return;
    const n = parseFloat(cur);
    if (prev !== null && op && !fresh) {
      const r = calc(prev, n, op);
      if (!Number.isFinite(r)) { reset(); setCur("Error"); return; }
      setPrev(r); setCur(fmt(r));
    } else setPrev(n);
    setOp(o); setFresh(true);
  };
  const equals = () => {
    if (prev === null || !op || cur === "Error") return;
    setCur(fmt(calc(prev, parseFloat(cur), op))); setPrev(null); setOp(null); setFresh(true);
  };
  const back = () => setCur(fresh || cur === "Error" || cur.length === 1 || (cur.length === 2 && cur[0] === "-") ? "0" : cur.slice(0, -1));
  const sign = () => cur !== "Error" && cur !== "0" && setCur(cur.startsWith("-") ? cur.slice(1) : "-" + cur);
  const pct = () => cur !== "Error" && setCur(fmt(parseFloat(cur) / 100));

  const key = "h-14 rounded-2xl text-xl font-semibold transition active:scale-95 ";
  const num = key + "border border-line bg-bg hover:border-brand";
  const fn = key + "bg-line/60 hover:bg-line";
  const opk = key + "bg-brand text-white hover:opacity-90";
  const B = ({ l, f, c, label }: { l: string; f: () => void; c: string; label?: string }) => <button onClick={f} className={c} aria-label={label}>{l}</button>;

  return (
    <div className={`${card} mx-auto max-w-sm`}>
      <div className="mb-4 rounded-2xl bg-navy p-4 text-right text-white" aria-live="polite" role="status">
        <div className="h-5 text-sm text-blue-200/70">{prev !== null && op ? `${fmt(prev)} ${op}` : ""}</div>
        <div className="truncate font-display text-4xl font-bold">{cur}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <B l="C" f={reset} c={fn} label="Borrar todo" /><B l="±" f={sign} c={fn} label="Cambiar signo" /><B l="%" f={pct} c={fn} label="Porcentaje" /><B l="÷" f={() => operator("÷")} c={opk} label="Dividir" />
        {["7", "8", "9"].map((d) => <B key={d} l={d} f={() => digit(d)} c={num} />)}<B l="×" f={() => operator("×")} c={opk} label="Multiplicar" />
        {["4", "5", "6"].map((d) => <B key={d} l={d} f={() => digit(d)} c={num} />)}<B l="−" f={() => operator("−")} c={opk} label="Restar" />
        {["1", "2", "3"].map((d) => <B key={d} l={d} f={() => digit(d)} c={num} />)}<B l="+" f={() => operator("+")} c={opk} label="Sumar" />
        <B l="0" f={() => digit("0")} c={num} /><B l="." f={() => digit(".")} c={num} label="Punto decimal" /><B l="⌫" f={back} c={fn} label="Borrar último dígito" /><B l="=" f={equals} c={opk} label="Igual" />
      </div>
    </div>
  );
}
