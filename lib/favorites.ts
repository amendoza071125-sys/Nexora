"use client";
import { useCallback, useEffect, useState } from "react";
const KEY = "nexora-favorites";
export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => { try { setFavs(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch { /* sin almacenamiento */ } }, []);
  const toggle = useCallback((slug: string) => {
    setFavs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignorar */ }
      return next;
    });
  }, []);
  return { favs, toggle };
}
