import { defineArrayMember, defineField } from "sanity";

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
                  rule.required().uri({
                    allowRelative: false,
                    scheme: ["http", "https", "mailto"],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "bodyImage" }),
    defineArrayMember({
      type: "code",
      options: {
        withFilename: true,
        language: "javascript",
      },
    }), // registered via @sanity/code-input's codeInput() plugin in apps/content-manager/sanity.config.ts
    defineArrayMember({ type: "youtube" }),
    defineArrayMember({ type: "callout" }),
  ],
  validation: (rule) => rule.required().min(1),
});
