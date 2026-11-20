import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" aria-label="NEXORA, ir al inicio" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#0A1330" />
        <path d="M9 23V9l14 14V9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="9" cy="9" r="2.6" fill="#2B5CFF" /><circle cx="23" cy="23" r="2.6" fill="#2B5CFF" />
      </svg>
      NEXORA
    </Link>
  );
}
