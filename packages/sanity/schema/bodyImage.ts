import { defineField, defineType } from "sanity";

export const bodyImageType = defineType({
  name: "bodyImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "Describe the image for screen readers and SEO. Required — also what Medium's importer uses.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional, shown beneath the image.",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Contained (matches text width)", value: "contained" },
          { title: "Wide (breaks out slightly)", value: "wide" },
          { title: "Full bleed", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "contained",
    }),
  ],
  preview: {
    select: { imageUrl: "asset", alt: "alt", caption: "caption" },
    prepare({ alt, caption }) {
      return {
        title: alt,
        subtitle: caption,
      };
    },
  },
});
