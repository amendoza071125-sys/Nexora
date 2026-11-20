import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav aria-label="Principal" className="flex items-center gap-1 text-sm font-medium">
          <Link href="/#herramientas" className="rounded-lg px-3 py-2 hover:bg-surface">Herramientas</Link>
          <Link href="/#categorias" className="hidden rounded-lg px-3 py-2 hover:bg-surface sm:block">Categorías</Link>
          <Link href="/#novedades" className="hidden rounded-lg px-3 py-2 hover:bg-surface sm:block">Novedades</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
