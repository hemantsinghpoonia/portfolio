import type { StructureResolver } from "sanity/structure";

/**
 * A minimal custom structure. With only two document types (post, tag)
 * the default auto-generated list would already be fine, but defining
 * this now means adding a third content type later (e.g. "project")
 * doesn't force a structure rewrite — it's additive from here.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem().title("Tags").schemaType("tag").child(S.documentTypeList("tag").title("Tags")),
    ]);
