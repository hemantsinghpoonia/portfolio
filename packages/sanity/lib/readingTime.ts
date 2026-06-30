import type { Post } from "./types";

type BodyContent = Post["body"];
type PortableTextBlock = Extract<BodyContent[number], { _type: "block" }>;
type CodeBlock = Extract<BodyContent[number], { _type: "code" }>;

const WORDS_PER_MINUTE = 200;

function isPortableTextBlock(
  block: BodyContent[number],
): block is PortableTextBlock {
  return block._type === "block";
}

function isCodeBlock(block: BodyContent[number]): block is CodeBlock {
  return block._type === "code";
}

export function estimateReadingTime(body: BodyContent | undefined) {
  if (!body || body.length === 0)
    return { text: "1 min read", isoDuration: "PT1M" };

  let words = 0;

  for (const block of body) {
    if (isPortableTextBlock(block)) {
      const text = block.children?.map((child) => child.text).join(" ") ?? "";
      const cleanText = text.replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, "");
      words += cleanText.trim().split(/\s+/).filter(Boolean).length;
    } else if (isCodeBlock(block)) {
      // Code reads roughly 2.5x slower per "word" (token) than prose.
      if (!block.code) continue;
      const codeWords = block.code.trim().split(/\s+/).filter(Boolean).length;
      words += Math.round(codeWords * 2.5);
    }
  }

  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return {
    text: `${minutes} min read`,
    isoDuration: `PT${minutes}M`, // PT = Period Time, M = Minutes
  };
}
