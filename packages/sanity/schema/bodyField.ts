import { defineArrayMember, defineField } from "sanity";

/**
 * The main rich-text body field used by `post`.
 *
 * Block-level marks/decorators are kept close to what Medium's importer
 * and semantic HTML actually support well: bold, italic, code, links,
 * h2/h3/h4, blockquote, and ordered/unordered lists. Avoiding exotic
 * marks here is deliberate — it keeps the rendered HTML clean.
 */
export const bodyField = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Inline code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule: any) =>
                  rule.required().uri({ allowRelative: false, scheme: ["http", "https", "mailto"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "bodyImage" }),
    defineArrayMember({ type: "code" }), // registered via @sanity/code-input's codeInput() plugin in apps/studio/sanity.config.ts
    defineArrayMember({ type: "youtube" }),
    defineArrayMember({ type: "callout" }),
  ],
  validation: (rule) => rule.required().min(1),
});
