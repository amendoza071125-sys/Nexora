"use client";
import { useEffect, useRef, useState } from "react";
import { btn, btn2, card, input } from "./ui";

type Item = { id: number; name: string; days: number[]; start: string; end: string };
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const COLORS = ["#2B5CFF", "#0E9F6E", "#D97706", "#9333EA", "#DC2626", "#0891B2"];
const mins = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);
const KEY = "nexora-horario";

export default function ScheduleTool() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("09:00");
  const [msg, setMsg] = useState("");
  const loaded = useRef(false);

  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch { /* vacío */ } loaded.current = true; }, []);
  useEffect(() => { if (loaded.current) try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignorar */ } }, [items]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setMsg("Escribe el nombre de la materia o actividad.");
    if (!days.length) return setMsg("Elige al menos un día.");
    if (mins(end) <= mins(start)) return setMsg("La hora de fin debe ser posterior a la de inicio.");
    setItems([...items, { id: Date.now(), name: name.trim(), days, start, end }]);
    setName(""); setMsg(`«${name.trim()}» añadida al horario.`);
  };

  const colorOf = (id: number) => COLORS[items.findIndex((i) => i.id === id) % COLORS.length];
  const cols = DAYS.map((_, i) => i).filter((i) => i < 5 || items.some((it) => it.days.includes(i)));
  const h0 = items.length ? Math.floor(Math.min(...items.map((i) => mins(i.start))) / 60) : 8;
  const h1 = items.length ? Math.ceil(Math.max(...items.map((i) => mins(i.end))) / 60) : 17;
  const hours = Array.from({ length: Math.max(1, h1 - h0) }, (_, k) => h0 + k);
  const at = (d: number, h: number) => items.filter((it) => it.days.includes(d) && mins(it.start) < (h + 1) * 60 && mins(it.end) > h * 60);

  const download = () => {
    const cw = 140, hw = 70, rh = 52, hh = 40, c = document.createElement("canvas");
    c.width = hw + cw * cols.length; c.height = hh + rh * hours.length;
    const x = c.getContext("2d")!; x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height);
    x.font = "bold 15px sans-serif"; x.fillStyle = "#0A1330"; x.textAlign = "center";
    cols.forEach((d, i) => x.fillText(DAYS[d], hw + cw * i + cw / 2, 26));
    hours.forEach((h, r) => {
      const y = hh + rh * r; x.fillStyle = "#5a6480"; x.font = "13px sans-serif"; x.fillText(`${String(h).padStart(2, "0")}:00`, hw / 2, y + rh / 2 + 4);
      cols.forEach((d, i) => {
        x.strokeStyle = "#dce3f5"; x.strokeRect(hw + cw * i, y, cw, rh);
        at(d, h).slice(0, 1).forEach((it) => { x.fillStyle = colorOf(it.id); x.fillRect(hw + cw * i + 3, y + 3, cw - 6, rh - 6); x.fillStyle = "#fff"; x.font = "bold 13px sans-serif"; x.fillText(it.name.slice(0, 18), hw + cw * i + cw / 2, y + rh / 2 + 4); });
      });
    });
    const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = "mi-horario-nexora.png"; a.click(); setMsg("Horario descargado como imagen PNG.");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className={`${card} no-print space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          <label className="block text-sm font-medium">Materia o actividad<input value={name} onChange={(e) => setName(e.target.value)} className={`${input} mt-1`} placeholder="Ej.: Matemáticas" /></label>
          <label className="block text-sm font-medium">Inicio<input type="time" value={start} onChange={(e) => setStart(e.target.value)} className={`${input} mt-1`} /></label>
          <label className="block text-sm font-medium">Fin<input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className={`${input} mt-1`} /></label>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Días">
          {DAYS.map((d, i) => <button type="button" key={d} aria-pressed={days.includes(i)} onClick={() => setDays(days.includes(i) ? days.filter((x) => x !== i) : [...days, i])} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${days.includes(i) ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{d}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-3"><button className={btn}>Añadir al horario</button><span aria-live="polite" className="text-sm text-muted">{msg}</span></div>
      </form>
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">Horario semanal</caption>
          <thead><tr><th className="w-16 p-2" />{cols.map((d) => <th key={d} className="p-2 font-display">{DAYS[d]}</th>)}</tr></thead>
          <tbody>{hours.map((h) => (
            <tr key={h}><th scope="row" className="p-2 text-right text-xs font-normal text-muted">{String(h).padStart(2, "0")}:00</th>
              {cols.map((d) => <td key={d} className="h-12 border border-line p-0.5">{at(d, h).map((it) => <div key={it.id} style={{ background: colorOf(it.id) }} className="truncate rounded-md px-2 py-1 text-xs font-semibold text-white">{it.name}</div>)}</td>)}
            </tr>))}</tbody>
        </table>
        {!items.length && <p className="p-4 text-center text-sm text-muted">Tu horario está vacío. Añade tu primera materia o actividad arriba.</p>}
      </div>
      {items.length > 0 && (
        <div className="no-print flex flex-wrap gap-3">
          <button className={btn} onClick={download}>Descargar PNG</button>
          <button className={btn2} onClick={() => window.print()}>Imprimir</button>
          <button className={btn2} onClick={() => { setItems([]); setMsg("Horario borrado."); }}>Borrar todo</button>
        </div>
      )}
      {items.length > 0 && (
        <ul className="no-print space-y-2 text-sm">{items.map((it) => (
          <li key={it.id} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2">
            <span><b>{it.name}</b> · {it.days.map((d) => DAYS[d]).join(", ")} · {it.start}–{it.end}</span>
            <button onClick={() => setItems(items.filter((x) => x.id !== it.id))} aria-label={`Quitar ${it.name}`} className="rounded-lg px-2 py-1 text-muted hover:text-brand">Quitar</button>
          </li>))}</ul>
      )}
    </div>
  );
}
