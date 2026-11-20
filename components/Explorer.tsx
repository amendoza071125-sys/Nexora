"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, norm, tools, type Tool } from "@/lib/tools";
import { useFavorites } from "@/lib/favorites";
import ToolCard from "./ToolCard";
import AdSlot from "./AdSlot";

export default function Explorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const { favs, toggle } = useFavorites();
  const searching = q.trim() !== "" || cat !== null;
  const results = useMemo(() => {
    const n = norm(q.trim());
    return tools.filter((t) => (!cat || t.category === cat) && (!n || norm([t.name, t.short, t.category, ...t.keywords].join(" ")).includes(n)));
  }, [q, cat]);
  const grid = (list: Tool[]) => (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((t) => <ToolCard key={t.slug} tool={t} fav={favs.includes(t.slug)} onFav={toggle} />)}
    </ul>
  );
  const section = (id: string, title: string, list: Tool[]) => list.length > 0 && (
    <section id={id} className="scroll-mt-24 pt-12"><h2 className="mb-5 font-display text-2xl font-bold">{title}</h2>{grid(list)}</section>
  );
  return (
    <>
      <div className="mx-auto -mt-7 max-w-2xl px-4">
        <label htmlFor="buscar" className="sr-only">Buscar herramienta</label>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl shadow-navy/10 focus-within:border-brand">
          <Search className="h-5 w-5 text-muted" aria-hidden />
          <input id="buscar" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca: QR, descuento, contraseña, horario…" className="w-full bg-transparent text-base outline-none placeholder:text-muted" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div id="categorias" className="flex scroll-mt-24 flex-wrap justify-center gap-2 pt-6" role="group" aria-label="Filtrar por categoría">
          {[null, ...categories].map((c) => (
            <button key={c ?? "todas"} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat === c ? "border-brand bg-brand text-white" : "border-line bg-surface hover:border-brand"}`}>{c ?? "Todas"}</button>
          ))}
        </div>
        <div id="herramientas" className="scroll-mt-24" aria-live="polite">
          {searching ? (
            results.length ? section("resultados", `${results.length} ${results.length === 1 ? "herramienta" : "herramientas"}`, results)
              : <p className="pt-12 text-center text-muted">No encontramos herramientas con esa búsqueda. Prueba con otra palabra o elige «Todas».</p>
          ) : (
            <>
              {section("favoritos", "Tus favoritas", tools.filter((t) => favs.includes(t.slug)))}
              {section("populares", "Las más populares", tools.filter((t) => t.popular))}
              <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
              {section("recomendadas", "Recomendadas", tools.filter((t) => t.recommended))}
              {section("novedades", "Novedades", tools.filter((t) => t.isNew))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
