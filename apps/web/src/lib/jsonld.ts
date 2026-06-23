const SITE_URL = "https://hemantsingh.dev";

export const personSchema = {
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hemant Singh",
  url: SITE_URL,
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
};

interface ArticleParams {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  publishedAt: string;
  readingTime: string;
}

export function getArticleSchema({
  title,
  excerpt,
  imageUrl,
  slug,
  publishedAt,
  readingTime,
}: ArticleParams) {
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: personSchema,
    publisher: personSchema,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    timeRequired: readingTime,
  };
}
