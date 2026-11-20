import Explorer from "@/components/Explorer";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: TAGLINE, inLanguage: "es" }) }} />
      <section className="dots bg-navy px-4 pb-20 pt-16 text-center text-white">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">{TAGLINE}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-blue-100/80">Ocho herramientas gratuitas, sin registro y sin enviar tus datos a ningún servidor.</p>
      </section>
      <Explorer />
    </>
  );
}
