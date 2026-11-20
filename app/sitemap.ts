import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { tools } from "@/lib/tools";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacidad", "/terminos", "/cookies", "/contacto", "/acerca-de"].map((p) => ({ url: `${SITE_URL}${p}` }));
  return [...pages, ...tools.map((t) => ({ url: `${SITE_URL}/herramientas/${t.slug}` }))];
}
