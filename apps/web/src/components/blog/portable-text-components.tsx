import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import { CodeBlockRenderer } from "./code-block";
import { YoutubeEmbed } from "./youtube-embed";
import { Callout } from "./callout";
import { BodyImageRenderer } from "./body-image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-body-lg text-foreground mb-6 leading-relaxed">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-headline-md text-foreground font-semibold mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl text-foreground font-semibold mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg text-foreground font-semibold mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-brand pl-6 my-8 text-body-lg text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="prose-lists pl-6 mb-6 space-y-2 text-body-lg text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="prose-lists pl-6 mb-6 space-y-2 text-body-lg text-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-surface-container-low px-1.5 py-0.5 font-mono text-[0.9em] text-brand-strong">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <Link
          href={href}
          className="text-brand-strong underline underline-offset-2 hover:text-brand"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    code: ({ value }) => <CodeBlockRenderer value={value} />,
    youtube: ({ value }) => <YoutubeEmbed value={value} />,
    callout: ({ value }) => <Callout value={value} />,
    bodyImage: ({ value }) => <BodyImageRenderer value={value} />,
  },
};
