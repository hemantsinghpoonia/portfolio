import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hemant Singh — Full-Stack Engineer",
    short_name: "Hemant Singh",
    description: "Portfolio of Hemant Singh (Poonia), a full-stack engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f5",
    theme_color: "#fbf9f5",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
