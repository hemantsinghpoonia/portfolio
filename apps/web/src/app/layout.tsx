import type { Metadata, Viewport } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd } from "@/components/json-ld";
import { personSchema, websiteSchema } from "@/lib/jsonld";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://hemantsingh.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hemant Singh — Full-Stack Engineer",
    template: "%s | Hemant Singh",
  },
  description:
    "Portfolio of Hemant Singh, full-stack engineer specializing in Next.js, Node.js & scalable backend systems. Building robust, production-grade web apps.",
  keywords: [
    "Hemant Singh",
    "Hemant Singh Poonia",
    "Full-Stack Engineer",
    "fullstack software engineer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Backend Engineer India",
  ],
  authors: [{ name: "Hemant Singh", url: SITE_URL }],
  creator: "Hemant Singh",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hemant Singh",
    title: "Hemant Singh — Full-Stack Engineer",
    description:
      "Portfolio of Hemant Singh, a full-stack engineer specializing in Next.js, Node.js, and scalable backend systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hemant Singh — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemant Singh — Full-Stack Engineer",
    description:
      "Portfolio of Hemant Singh, a full-stack engineer specializing in Next.js, Node.js, and scalable backend systems.",
    images: ["/og-image.png"],
    creator: "@hemantspoonia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable}`}>
      <head>
        <JsonLd schema={personSchema} />
        <JsonLd schema={websiteSchema} />
      </head>
      <body className="font-app text-body-md antialiased relative bg-background text-foreground">
        <TooltipProvider>
          <Sidebar />
          <MobileNav />
          <main className="app-shell">
            {children}
            <Footer />
          </main>
          {isDraftMode && <VisualEditing />}
        </TooltipProvider>
      </body>
    </html>
  );
}
