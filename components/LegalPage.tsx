import Link from "next/link";
import { UPDATED } from "@/lib/site";
export default function LegalPage({ title, children, dated = true }: { title: string; children: React.ReactNode; dated?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/" className="text-sm text-brand hover:underline">Volver al inicio</Link>
      <h1 className="mb-2 mt-4 font-display text-3xl font-bold">{title}</h1>
      {dated && <p className="mb-6 text-sm text-muted">Última actualización: {UPDATED}</p>}
      <div className="space-y-4 leading-relaxed [&_a]:text-brand [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_li]:text-muted [&_p]:text-muted [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">{children}</div>
    </div>
  );
}
