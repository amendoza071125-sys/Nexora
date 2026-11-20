import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorker from "@/components/ServiceWorker";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const viewport = { themeColor: "#0A1330" };

export const metadata: Metadata = {
  appleWebApp: { capable: true, title: "NEXORA", statusBarStyle: "black-translucent" },
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | Herramientas gratuitas en línea`, template: `%s | ${SITE_NAME}` },
  description: `${TAGLINE}. Herramientas gratuitas que funcionan en tu navegador: QR, calculadoras, conversores, Pomodoro y más.`,
  openGraph: { siteName: SITE_NAME, type: "website", locale: "es_ES" },
};

const themeScript = `try{var t=localStorage.getItem('nexora-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <ServiceWorker />
        {adClient && <Script async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`} />}
      </body>
    </html>
  );
}
