import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the post title in <title>, OpenGraph, and Twitter cards. Leave blank to reuse the post title.",
      validation: (rule) => rule.max(60).warning("Longer titles get truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Overrides the excerpt for search engines and social previews. Leave blank to reuse the post excerpt.",
      validation: (rule) =>
        rule.max(160).warning("Longer descriptions get truncated in search results."),
    }),
    defineField({
      name: "ogImage",
      title: "Custom OG image",
      type: "image",
      description:
        "Optional. If left empty, an OG image is generated automatically from the post title.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds a noindex directive. Use for drafts you publish but don't want indexed yet.",
      initialValue: false,
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
