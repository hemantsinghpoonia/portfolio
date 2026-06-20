import { createClient } from "next-sanity";

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});
