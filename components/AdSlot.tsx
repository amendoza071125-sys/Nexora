"use client";
import { useEffect } from "react";
// Solo muestra publicidad real cuando existen NEXT_PUBLIC_ADSENSE_CLIENT y el id del espacio.
// Sin ellos no se muestra nada (en desarrollo, solo un marcador para ver dónde irá).
export default function AdSlot({ slot, label = "Publicidad" }: { slot?: string; label?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const live = Boolean(client && slot);
  useEffect(() => {
    if (!live) return;
    try { ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({}); } catch { /* ignorar */ }
  }, [live]);
  if (!live) {
    if (process.env.NODE_ENV !== "development") return null;
    return <div className="my-8 rounded-2xl border border-dashed border-line p-6 text-center text-xs text-muted">Espacio reservado para publicidad (solo visible en desarrollo)</div>;
  }
  return (
    <aside aria-label={label} className="my-8 overflow-hidden">
      <p className="mb-1 text-center text-xs text-muted">{label}</p>
      <ins className="adsbygoogle block" data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
