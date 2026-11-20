export const categories = ["Educación", "Matemáticas", "Productividad", "Conversores", "Herramientas digitales"] as const;
export type Category = (typeof categories)[number];
export type Tool = {
  slug: string; name: string; short: string; category: Category; icon: string;
  keywords: string[]; popular?: boolean; recommended?: boolean; isNew?: boolean;
};
export const tools: Tool[] = [
  { slug: "generador-qr", name: "Generador de códigos QR", short: "Convierte un enlace o texto en un QR descargable.", category: "Herramientas digitales", icon: "QrCode", keywords: ["qr", "codigo", "enlace", "url"], popular: true, isNew: true },
  { slug: "calculadora", name: "Calculadora", short: "Operaciones básicas con una interfaz clara.", category: "Matemáticas", icon: "Calculator", keywords: ["sumar", "restar", "multiplicar", "dividir"], popular: true },
  { slug: "calculadora-porcentajes", name: "Calculadora de porcentajes", short: "Calcula porcentajes y descuentos al instante.", category: "Matemáticas", icon: "Percent", keywords: ["descuento", "rebaja", "porcentaje"], popular: true, recommended: true },
  { slug: "contador-palabras", name: "Contador de palabras", short: "Palabras, caracteres y párrafos en tiempo real.", category: "Educación", icon: "Type", keywords: ["caracteres", "parrafos", "texto", "ensayo"], recommended: true },
  { slug: "conversor-unidades", name: "Conversor de unidades", short: "Longitud, peso, temperatura y volumen.", category: "Conversores", icon: "ArrowLeftRight", keywords: ["metros", "kilos", "celsius", "litros"], popular: true },
  { slug: "temporizador-pomodoro", name: "Temporizador Pomodoro", short: "Sesiones de enfoque con descansos cortos y largos.", category: "Productividad", icon: "Timer", keywords: ["enfoque", "concentracion", "estudio", "descanso"], recommended: true, isNew: true },
  { slug: "generador-contrasenas", name: "Generador de contraseñas", short: "Contraseñas seguras creadas en tu dispositivo.", category: "Herramientas digitales", icon: "KeyRound", keywords: ["password", "clave", "seguridad"], popular: true },
  { slug: "generador-horarios", name: "Generador de horarios", short: "Organiza materias y actividades; imprime o descarga.", category: "Educación", icon: "CalendarDays", keywords: ["horario", "clases", "materias", "semana"], recommended: true },
];
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const categorySlug = (c: string) => norm(c).replace(/\s+/g, "-");
