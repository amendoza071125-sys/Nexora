import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { OWNER } from "@/lib/site";
export const metadata: Metadata = { title: "Términos y condiciones", description: "Condiciones de uso de las herramientas gratuitas de NEXORA.", alternates: { canonical: "/terminos" } };
export default function Page() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>Al usar NEXORA aceptas estas condiciones. El sitio es operado por {OWNER}.</p>
      <h2>Uso del servicio</h2>
      <p>Las herramientas son gratuitas y se ofrecen para uso personal, educativo y profesional. No puedes usarlas para actividades ilegales ni intentar dañar o sobrecargar el sitio.</p>
      <h2>Sin garantías</h2>
      <p>Hacemos lo posible por que los resultados sean correctos, pero se ofrecen «tal cual». Verifica los cálculos y conversiones importantes antes de tomar decisiones basadas en ellos. No nos hacemos responsables de pérdidas derivadas del uso de las herramientas.</p>
      <h2>Contraseñas y códigos QR</h2>
      <p>Eres responsable de guardar tus contraseñas de forma segura y del contenido de los códigos QR que generes y compartas.</p>
      <h2>Propiedad intelectual</h2>
      <p>El diseño, los textos y el código de NEXORA pertenecen a sus autores. Lo que generes con las herramientas es tuyo.</p>
      <h2>Publicidad y enlaces</h2>
      <p>El sitio puede mostrar publicidad de terceros, claramente identificada. No controlamos los sitios de los anunciantes.</p>
      <h2>Cambios</h2>
      <p>Podemos modificar estas condiciones o las herramientas. El uso continuado implica la aceptación de los cambios.</p>
    </LegalPage>
  );
}
