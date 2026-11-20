import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";
export const metadata: Metadata = { title: "Contacto", description: "Escribe al equipo de NEXORA para sugerencias, errores o consultas.", alternates: { canonical: "/contacto" } };
export default function Page() {
  return (
    <LegalPage title="Contacto" dated={false}>
      <p>¿Encontraste un error o tienes una idea para una nueva herramienta? Cuéntanos.</p>
      {CONTACT_EMAIL ? <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p> : <p>El correo de contacto estará disponible próximamente.</p>}
      <p>Para ayudarte mejor, indica la herramienta, el dispositivo y el navegador que usas.</p>
    </LegalPage>
  );
}
