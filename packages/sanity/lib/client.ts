import { createClient, type ClientConfig } from "next-sanity";

export const apiVersion = "2026-05-15";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const baseConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
};

export const sanityClient = createClient({
  ...baseConfig,
  useCdn: true,
  perspective: "published",
});

export function getDraftModeClient() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN — required for Draft Mode previews.",
    );
  }
  return createClient({
    ...baseConfig,
    useCdn: false,
    perspective: "drafts",
    token,
    stega: {
      enabled: true,
      studioUrl: process.env.SANITY_STUDIO_URL!,
    },
  });
}
