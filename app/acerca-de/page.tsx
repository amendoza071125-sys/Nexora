import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { TAGLINE } from "@/lib/site";
export const metadata: Metadata = { title: "Acerca de NEXORA", description: "NEXORA reúne herramientas digitales gratuitas, rápidas y privadas para estudiantes, profesionales y todo el mundo.", alternates: { canonical: "/acerca-de" } };
export default function Page() {
  return (
    <LegalPage title="Acerca de NEXORA" dated={false}>
      <p>{TAGLINE}. NEXORA reúne herramientas pequeñas y útiles para el día a día: códigos QR, calculadoras, conversores, un temporizador Pomodoro, contraseñas seguras y horarios.</p>
      <h2>Cómo trabajamos</h2>
      <ul><li>Gratis y sin registro.</li><li>Todo se procesa en tu navegador, sin enviar tus datos a un servidor.</li><li>Si mostramos publicidad, será real, identificada y sin interferir con las herramientas.</li></ul>
      <p>Mira todas las <Link href="/#herramientas">herramientas</Link> o <Link href="/contacto">escríbenos</Link> con tus sugerencias.</p>
    </LegalPage>
  );
}
