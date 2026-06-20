import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/**
 * Main Document Resolver: when an editor navigates the preview iframe
 * to /blog/some-slug, Presentation needs to know "the post with that
 * slug" is the document being edited. Without this, opening Presentation
 * shows the preview but no document pane — you'd have to manually find
 * the post in the Posts list every time.
 */
const mainDocuments = defineDocuments([
  {
    route: "/blog/:slug",
    filter: `_type == "post" && slug.current == $slug`,
  },
]);

/**
 * Document Locations Resolver: the reverse direction — from inside a
 * post document, "where does this appear on the live site" links,
 * shown in the document pane's top bar.
 */
const locations: PresentationPluginOptions["resolve"] = {
  mainDocuments,
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled post",
            href: `/blog/${doc?.slug}`,
          },
          { title: "Blog index", href: "/blog" },
          { title: "Homepage", href: "/" },
        ],
      }),
    }),
    tag: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled tag", href: `/blog?tag=${doc?.slug}` }],
      }),
    }),
  },
};

export const resolve = locations;
