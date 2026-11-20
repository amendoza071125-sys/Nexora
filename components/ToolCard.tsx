import Link from "next/link";
import * as Icons from "lucide-react";
import { Heart } from "lucide-react";
import type { Tool } from "@/lib/tools";
export default function ToolCard({ tool, fav, onFav }: { tool: Tool; fav: boolean; onFav: (slug: string) => void }) {
  const Icon = (Icons as any)[tool.icon] ?? Icons.Wrench;
  return (
    <li className="group relative rounded-3xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg hover:shadow-brand/10">
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-navy text-white group-hover:bg-brand"><Icon className="h-5 w-5" aria-hidden /></span>
      <h3 className="font-display text-lg font-semibold">
        <Link href={`/herramientas/${tool.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">{tool.name}</Link>
      </h3>
      <p className="mt-1 text-sm text-muted">{tool.short}</p>
      <button onClick={() => onFav(tool.slug)} aria-pressed={fav} aria-label={fav ? `Quitar ${tool.name} de favoritos` : `Guardar ${tool.name} en favoritos`} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full hover:bg-bg">
        <Heart className={`h-5 w-5 ${fav ? "fill-brand text-brand" : "text-muted"}`} aria-hidden />
      </button>
    </li>
  );
}
