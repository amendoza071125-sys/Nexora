import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import QrTool from "@/components/tools/QrTool";
import CalculatorTool from "@/components/tools/CalculatorTool";
import PercentTool from "@/components/tools/PercentTool";
import WordCounterTool from "@/components/tools/WordCounterTool";
import UnitTool from "@/components/tools/UnitTool";
import PomodoroTool from "@/components/tools/PomodoroTool";
import PasswordTool from "@/components/tools/PasswordTool";
import ScheduleTool from "@/components/tools/ScheduleTool";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { getTool, tools } from "@/lib/tools";

const live: Record<string, () => React.ReactElement> = {
  "generador-qr": () => <QrTool />,
  calculadora: () => <CalculatorTool />,
  "calculadora-porcentajes": () => <PercentTool />,
  "contador-palabras": () => <WordCounterTool />,
  "conversor-unidades": () => <UnitTool />,
  "temporizador-pomodoro": () => <PomodoroTool />,
  "generador-contrasenas": () => <PasswordTool />,
  "generador-horarios": () => <ScheduleTool />,
};

export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ slug: t.slug }));
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  const title = `${tool.name} gratis en línea`;
  return { title, description: `${tool.short} Gratis, sin registro y sin enviar tus datos a ningún servidor.`, alternates: { canonical: `/herramientas/${tool.slug}` } };
}

export default async function ToolPage({ params }: Props) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const render = live[tool.slug];
  const info = content[tool.slug];
  const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.short, url: `${SITE_URL}/herramientas/${tool.slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", inLanguage: "es", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Ruta"><Link href="/" className="text-sm text-brand hover:underline">Inicio</Link> <span className="text-muted">/ {tool.category}</span></nav>
      <h1 className="mb-2 mt-3 font-display text-3xl font-bold sm:text-4xl">{tool.name}</h1>
      <p className="mb-8 text-muted">{tool.short}</p>
      {render ? render() : <p className="rounded-2xl border border-line bg-surface p-6">Esta herramienta se activa en la siguiente etapa del proyecto.</p>}
      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
      {info && (
        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-xl font-semibold">Para qué sirve</h2>
          <p className="mt-2 leading-relaxed text-muted">{info.about}</p>
          <h2 className="mt-8 font-display text-xl font-semibold">Cómo usarla</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">{info.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>
      )}
    </div>
  );
}
