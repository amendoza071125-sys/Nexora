import Link from "next/link";
import Logo from "./Logo";
import { TAGLINE } from "@/lib/site";
const legal = [["Privacidad", "/privacidad"], ["Términos", "/terminos"], ["Cookies", "/cookies"], ["Contacto", "/contacto"], ["Acerca de", "/acerca-de"]];
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div><Logo /><p className="mt-2 text-sm text-muted">{TAGLINE}. Tus datos se procesan en tu navegador.</p></div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {legal.map(([t, h]) => <Link key={h} href={h} className="text-muted hover:text-brand">{t}</Link>)}
        </nav>
      </div>
      <p className="pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} NEXORA</p>
    </footer>
  );
}
