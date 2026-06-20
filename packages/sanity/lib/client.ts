import { createClient, type ClientConfig } from "next-sanity";

export const apiVersion = "2026-05-15";

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
export const dataset = process.env.SANITY_STUDIO_DATASET!;

const baseConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
};

/**
 * Public, cached client. Use for any published-content read that doesn't
 * need draft data — listing pages, sitemap, RSS, etc. Safe to call from
 * the client/edge since it carries no token.
 */
export const sanityClient = createClient({
  ...baseConfig,
  useCdn: true,
  perspective: "published",
});

/**
 * Server-only client with a read token, used for Draft Mode previews.
 * Never import this in client components — it requires SANITY_API_READ_TOKEN.
 */
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
  });
}
