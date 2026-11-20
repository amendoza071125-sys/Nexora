"use client";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("nexora-theme", dark ? "dark" : "light"); } catch { /* ignorar */ }
  };
  return (
    <button onClick={toggle} aria-label="Cambiar entre modo claro y oscuro" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface transition hover:border-brand">
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden /><Moon className="h-5 w-5 dark:hidden" aria-hidden />
    </button>
  );
}
