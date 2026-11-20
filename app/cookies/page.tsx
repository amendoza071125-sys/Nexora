import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
export const metadata: Metadata = { title: "Política de cookies", description: "Qué almacenamiento usa NEXORA en tu navegador y cómo cambiarlo.", alternates: { canonical: "/cookies" } };
export default function Page() {
  return (
    <LegalPage title="Política de cookies">
      <p>Esta página explica qué se guarda en tu navegador al usar NEXORA.</p>
      <h2>Almacenamiento necesario</h2>
      <p>Usamos el almacenamiento local de tu navegador (no cookies de seguimiento) para recordar tu tema claro u oscuro, tus favoritos y tu horario. Es necesario para que esas funciones trabajen y no se comparte con nadie.</p>
      <h2>Cookies publicitarias</h2>
      <p>Cuando se active Google AdSense, Google y sus socios podrán usar cookies para mostrar y medir anuncios. En ese momento NEXORA solicitará tu consentimiento donde la ley lo exija, y podrás cambiarlo después.</p>
      <h2>Cómo gestionarlas</h2>
      <p>Puedes borrar el almacenamiento local y las cookies desde los ajustes de tu navegador. Si lo haces, se perderán tus favoritos y tu horario guardado. También puedes gestionar la personalización de anuncios en la configuración de anuncios de Google.</p>
    </LegalPage>
  );
}
