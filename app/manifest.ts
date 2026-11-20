import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXORA", short_name: "NEXORA", description: "Todo lo que necesitas, en un solo lugar",
    start_url: "/", scope: "/", display: "standalone", orientation: "portrait",
    background_color: "#0A1330", theme_color: "#0A1330", lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
