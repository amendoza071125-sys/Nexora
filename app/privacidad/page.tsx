import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { OWNER } from "@/lib/site";
export const metadata: Metadata = { title: "Política de privacidad", description: "Cómo trata NEXORA tus datos: las herramientas funcionan en tu navegador y no exigen registro.", alternates: { canonical: "/privacidad" } };
export default function Page() {
  return (
    <LegalPage title="Política de privacidad">
      <p>NEXORA es un sitio de herramientas gratuitas gestionado por {OWNER}. Esta política explica qué información se trata cuando lo usas.</p>
      <h2>Lo que no recopilamos</h2>
      <p>No necesitas cuenta para usar NEXORA. Lo que escribes en las herramientas (textos, enlaces, contraseñas generadas, horarios) se procesa en tu navegador y no se envía a nuestros servidores.</p>
      <h2>Lo que se guarda en tu dispositivo</h2>
      <ul><li>Tu preferencia de modo claro u oscuro.</li><li>Tus herramientas favoritas.</li><li>El horario que crees con el generador de horarios.</li></ul>
      <p>Estos datos se almacenan solo en tu navegador (almacenamiento local). Puedes borrarlos en cualquier momento desde los ajustes de tu navegador.</p>
      <h2>Datos técnicos de alojamiento</h2>
      <p>Como cualquier sitio web, el proveedor de alojamiento puede registrar datos técnicos de la visita, como la dirección IP y el tipo de navegador, para garantizar la seguridad y el funcionamiento del servicio.</p>
      <h2>Publicidad</h2>
      <p>NEXORA puede mostrar anuncios de Google AdSense. Si se activan, Google y sus socios pueden usar cookies o identificadores similares para mostrar anuncios y medir su rendimiento, y se pedirá tu consentimiento donde la ley lo exija. Puedes gestionar la personalización de anuncios en la configuración de anuncios de Google. Más información en <Link href="/cookies">la política de cookies</Link>.</p>
      <h2>Tus derechos</h2>
      <p>Según tu país, puedes tener derecho a acceder, rectificar o suprimir tus datos personales. Si nos escribes desde la página de <Link href="/contacto">contacto</Link>, usaremos tu mensaje solo para responderte.</p>
      <h2>Cambios</h2>
      <p>Si esta política cambia, actualizaremos la fecha de arriba.</p>
    </LegalPage>
  );
}
