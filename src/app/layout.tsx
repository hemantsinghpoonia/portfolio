import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hemant Singh — Full-Stack Engineer",
    template: "%s | Hemant Singh",
  },
  description:
    "Portfolio of Hemant Singh, a full-stack software engineer specializing in Next.js, Node.js, and scalable backend systems. Building robust, clean, production-grade web applications.",
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
  manifest: "/site.webmanifest",
};

function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hemant Singh",
    alternateName: "Hemant Singh Poonia",
    url: SITE_URL,
    // image: `${SITE_URL}/profile.jpg`,
    jobTitle: "Full-Stack Engineer",
    description:
      "Full-stack engineer specializing in Next.js, Node.js, and scalable backend systems.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Meerut",
      addressCountry: "IN",
    },
    sameAs: [
      "https://linkedin.com/in/hemantsinghpoonia",
      "https://github.com/hemantsinghpoonia",
      "https://x.com/hemantspoonia",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "System Design",
      "Backend Architecture",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hemant Singh",
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: "Hemant Singh",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable}`}>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="font-app text-body-md antialiased relative bg-background text-foreground">
        <Sidebar />
        <MobileNav />
        <main className="app-shell">{children}</main>
      </body>
    </html>
  );
}
