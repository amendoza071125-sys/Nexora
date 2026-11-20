"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { btn, btn2, card } from "./ui";

const MODES = { focus: { l: "Enfoque", m: 25 }, short: { l: "Descanso corto", m: 5 }, long: { l: "Descanso largo", m: 15 } } as const;
type Mode = keyof typeof MODES;
const R = 90, C = 2 * Math.PI * R;

export default function PomodoroTool() {
  const [mode, setMode] = useState<Mode>("focus");
  const [left, setLeft] = useState(MODES.focus.m * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const [msg, setMsg] = useState("");
  const endAt = useRef(0);
  const total = MODES[mode].m * 60;

  const select = (m: Mode) => { setMode(m); setLeft(MODES[m].m * 60); setRunning(false); };
  const beep = () => { try { const a = new AudioContext(), o = a.createOscillator(); o.connect(a.destination); o.frequency.value = 880; o.start(); o.stop(a.currentTime + 0.4); } catch { /* sin audio */ } };
  const finish = useCallback(() => {
    beep();
    if (mode === "focus") {
      const n = done + 1; setDone(n);
      const next: Mode = n % 4 === 0 ? "long" : "short";
      setMsg(`Sesión completada. Toca un ${MODES[next].l.toLowerCase()}.`); select(next);
    } else { setMsg("Descanso terminado. Vuelve al enfoque."); select("focus"); }
  }, [mode, done]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const rem = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setLeft(rem); if (rem === 0) finish();
    }, 250);
    return () => clearInterval(id);
  }, [running, finish]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0"), ss = String(left % 60).padStart(2, "0");
  useEffect(() => { if (!running) return; const t = document.title; document.title = `${mm}:${ss} · NEXORA`; return () => { document.title = t; }; }, [running, mm, ss]);

  const start = () => { endAt.current = Date.now() + left * 1000; setMsg(""); setRunning(true); };
  return (
    <div className={`${card} mx-auto max-w-md text-center`}>
      <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Tipo de sesión">
        {(Object.keys(MODES) as Mode[]).map((m) => <button key={m} onClick={() => select(m)} aria-pressed={mode === m} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${mode === m ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{MODES[m].l}</button>)}
      </div>
      <div className="relative mx-auto h-56 w-56">
        <svg viewBox="0 0 200 200" className="-rotate-90" aria-hidden>
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(var(--line))" strokeWidth="10" />
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(var(--brand))" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - left / total)} />
        </svg>
        <div className="absolute inset-0 grid place-items-center"><div role="timer" aria-label={`${mm} minutos ${ss} segundos`} className="font-display text-5xl font-bold tabular-nums">{mm}:{ss}</div></div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {running ? <button className={btn} onClick={() => setRunning(false)}>Pausar</button> : <button className={btn} onClick={start}>{left < total ? "Continuar" : "Iniciar"}</button>}
        <button className={btn2} onClick={() => { setRunning(false); setLeft(total); setMsg(""); }}>Reiniciar</button>
      </div>
      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-muted">{msg || `Sesiones de enfoque completadas: ${done}`}</p>
    </div>
  );
}
