import { defineField, defineType } from "sanity";

export const youtubeType = defineType({
  name: "youtube",
  title: "YouTube embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      description: "Paste the full video URL, e.g. https://www.youtube.com/watch?v=...",
      validation: (rule) =>
        rule.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption shown under the embed.",
    }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare({ url, caption }) {
      return {
        title: caption || "YouTube embed",
        subtitle: url,
      };
    },
  },
});
