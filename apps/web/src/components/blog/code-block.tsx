import { codeToHtml } from "shiki";
import { CopyCodeButton } from "./copy-code-button";
import type { Code } from "@repo/sanity-schema";

export async function CodeBlockRenderer({ value }: { value: Code }) {
  const { language, filename, code, highlightedLines } = value;
  if (!code) return null;

  const LANG_MAP: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    jsx: "jsx",
    tsx: "tsx",
    bash: "sh",
    python: "py",
    ruby: "rb",
    yaml: "yml",
    markdown: "md",
    mdx: "mdx",
  };
  const resolvedLang = LANG_MAP[language ?? ""] ?? language ?? "text";

  const html = await codeToHtml(code.endsWith("\n") ? code : code + "\n", {
    lang: resolvedLang,
    theme: "github-dark-default",
    transformers: [
      {
        line(node, line) {
          this.addClassToHast(node, "code-line");
          if (highlightedLines?.includes(line)) {
            this.addClassToHast(node, "code-block__line--highlighted");
          }
        },
      },
    ],
  });

  return (
    <div className="code-block not-prose my-8">
      <div className="code-block__header">
        <span className="code-block__filename">
          {filename || (language ? language.toUpperCase() : "Code")}
        </span>
        <CopyCodeButton code={code} />
      </div>
      <div
        className="code-block__body text-sm leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:!p-0 [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_.code-line]:inline-block [&_.code-line]:w-full [&_.code-line]:px-4 [&_pre]:!p-0 [&_.code-block__line--highlighted]:bg-white/5 [&_.code-block__line--highlighted]:border-l-2 [&_.code-block__line--highlighted]:border-brand"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
