"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";

const visuals: Record<number, React.ComponentType> = {
  1: dynamic(() => import("./visuals/Strength1Visual"), { ssr: false }),
  2: dynamic(() => import("./visuals/Strength2Visual"), { ssr: false }),
  3: dynamic(() => import("./visuals/Strength3Visual"), { ssr: false }),
  4: dynamic(() => import("./visuals/Strength4Visual"), { ssr: false }),
  5: dynamic(() => import("./visuals/Strength5Visual"), { ssr: false }),
  6: dynamic(() => import("./visuals/Strength6Visual"), { ssr: false }),
  7: dynamic(() => import("./visuals/Strength7Visual"), { ssr: false }),
};

function splitAtStrengths(md: string) {
  const sections: { markdown: string; visualNum?: number }[] = [];
  const strengthPattern = /^### Strength (\d):/gm;
  let lastIndex = 0;
  let match;

  // Find the index of each "### Strength N:" heading
  const splits: { index: number; num: number }[] = [];
  while ((match = strengthPattern.exec(md)) !== null) {
    splits.push({ index: match.index, num: parseInt(match[1]) });
  }

  for (let i = 0; i < splits.length; i++) {
    const start = splits[i].index;
    const end = splits[i + 1]?.index ?? findNextH2(md, start);

    // Text before the first strength (intro)
    if (i === 0 && lastIndex < start) {
      sections.push({ markdown: md.slice(lastIndex, start).trim() });
    }

    sections.push({
      markdown: md.slice(start, end).trim(),
      visualNum: splits[i].num,
    });

    lastIndex = end;
  }

  // Everything after the last strength section
  if (lastIndex < md.length) {
    sections.push({ markdown: md.slice(lastIndex).trim() });
  }

  return sections;
}

function findNextH2(md: string, afterIndex: number): number {
  const rest = md.slice(afterIndex);
  // Find the next ## or --- separator after the current strength section
  const h2Match = rest.match(/\n---\n\n## /);
  if (h2Match && h2Match.index !== undefined) {
    return afterIndex + h2Match.index;
  }
  return md.length;
}

export default function ArticleRenderer({ content }: { content: string }) {
  // Strip the top-level title (we render it in the page header)
  const withoutTitle = content.replace(/^# .+\n+/, "");
  const sections = splitAtStrengths(withoutTitle);

  return (
    <div>
      {sections.map((section, i) => {
        const Visual = section.visualNum
          ? visuals[section.visualNum]
          : undefined;
        return (
          <div key={i}>
            <div className="prose prose-lg max-w-none prose-headings:tracking-tighter prose-headings:font-bold prose-p:leading-[1.75] prose-pre:font-mono prose-pre:bg-[#0f1629] prose-pre:text-[#e2e8f0] prose-code:text-foreground prose-strong:text-foreground prose-th:text-left prose-table:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section.markdown}
              </ReactMarkdown>
            </div>
            {Visual && (
              <figure className="visual-breakout my-12 overflow-hidden rounded-xl bg-[#0B0F1A]">
                <div className="p-6 md:p-10">
                  <Visual />
                </div>
                <figcaption className="px-6 pb-4 font-mono text-xs text-[#64748B]">
                  Fig {section.visualNum} — Interactive visualization
                </figcaption>
              </figure>
            )}
          </div>
        );
      })}
    </div>
  );
}
