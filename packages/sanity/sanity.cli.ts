/**
 *This is not the correct config for sanity cli, but it is a work-around that is used strictly for *type generation. The config is more suitable for sanity.config.ts, but schema extraction and type *generation only work with sanity.cli.ts, so here we are.
 */
import { defineConfig } from "sanity";
import { schemaTypes } from "./schema";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [codeInput()],
  schema: {
    types: schemaTypes,
  },
  typegen: {
    path: "./lib/queries.ts",
    schema: "./schema.json",
    generates: "./lib/types.ts",
    overloadClientMethods: true,
  },
});
