import type { BodyContent, PortableTextBlock, CodeBlock } from "./types";

const WORDS_PER_MINUTE = 200;

function isPortableTextBlock(block: BodyContent[number]): block is PortableTextBlock {
  return block._type === "block";
}

function isCodeBlock(block: BodyContent[number]): block is CodeBlock {
  return block._type === "code";
}

/**
 * Estimates reading time from the post body. Text blocks count at normal
 * reading speed; code blocks count slower (people skim/scan code rather
 * than read it line by line, but still spend real time on it).
 */
export function estimateReadingTime(body: BodyContent | undefined): string {
  if (!body || body.length === 0) return "1 min read";

  let words = 0;

  for (const block of body) {
    if (isPortableTextBlock(block)) {
      const text = block.children?.map((child) => child.text).join(" ") ?? "";
      words += text.trim().split(/\s+/).filter(Boolean).length;
    } else if (isCodeBlock(block)) {
      // Code reads roughly 2.5x slower per "word" (token) than prose.
      const codeWords = block.code.trim().split(/\s+/).filter(Boolean).length;
      words += Math.round(codeWords * 2.5);
    }
  }

  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
