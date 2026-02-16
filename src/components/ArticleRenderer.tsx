"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
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

// Map mechanic numbers to visual component numbers
const MECHANIC_VISUALS: Record<number, number[]> = {
  1: [1],    // Pattern Blending
  2: [3, 6], // Constraint Stacking + Structured Output
  3: [],     // Context Window — no visual
  4: [4],    // Expert Compression
  5: [5],    // Edit > Generate
  6: [7],    // Parallel Exploration
};

function splitAtMechanics(md: string) {
  const sections: { markdown: string; mechanicNum?: number }[] = [];
  const mechanicPattern = /^### Mechanic (\d):/gm;
  let lastIndex = 0;
  let match;

  const splits: { index: number; num: number }[] = [];
  while ((match = mechanicPattern.exec(md)) !== null) {
    splits.push({ index: match.index, num: parseInt(match[1]) });
  }

  for (let i = 0; i < splits.length; i++) {
    const start = splits[i].index;
    const end = splits[i + 1]?.index ?? findNextH2(md, start);

    if (i === 0 && lastIndex < start) {
      sections.push({ markdown: md.slice(lastIndex, start).trim() });
    }

    sections.push({
      markdown: md.slice(start, end).trim(),
      mechanicNum: splits[i].num,
    });

    lastIndex = end;
  }

  if (lastIndex < md.length) {
    sections.push({ markdown: md.slice(lastIndex).trim() });
  }

  return sections;
}

function findNextH2(md: string, afterIndex: number): number {
  const rest = md.slice(afterIndex);
  const h2Match = rest.match(/\n---\n\n## /);
  if (h2Match && h2Match.index !== undefined) {
    return afterIndex + h2Match.index;
  }
  return md.length;
}

const FRAMEWORK_KEYWORDS: Record<string, { color: string; bg: string; border: string }> = {
  "Exploits:": { color: "text-emerald-400", bg: "bg-emerald-950/30", border: "border-emerald-800/40" },
  "Compensates:": { color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-800/40" },
  "Provenance:": { color: "text-blue-400", bg: "bg-blue-950/30", border: "border-blue-800/40" },
};

function getFrameworkKeyword(children: React.ReactNode): string | null {
  const childArray = React.Children.toArray(children);
  if (childArray.length === 0) return null;
  const first = childArray[0];
  if (React.isValidElement(first) && first.type === "strong") {
    const strongText = String((first.props as { children?: React.ReactNode }).children ?? "");
    for (const kw of Object.keys(FRAMEWORK_KEYWORDS)) {
      if (strongText.startsWith(kw)) return kw;
    }
  }
  return null;
}

const markdownComponents: Components = {
  p: ({ children, ...rest }) => {
    const kw = getFrameworkKeyword(children);
    if (!kw) return <p {...rest}>{children}</p>;
    const style = FRAMEWORK_KEYWORDS[kw];
    return (
      <div className={`not-prose my-4 rounded-lg ${style.bg} border ${style.border} px-5 py-4`}>
        <div className={`font-mono text-[10px] tracking-widest uppercase ${style.color} mb-2`}>
          {kw.replace(":", "")}
        </div>
        <div className="text-[15px] leading-relaxed text-[#CBD5E1]">
          {React.Children.map(children, (child, i) => {
            if (i === 0 && React.isValidElement(child) && child.type === "strong") {
              const text = String((child.props as { children?: React.ReactNode }).children ?? "");
              const remaining = text.slice(kw.length).trim();
              return remaining ? <span className="text-[#94A3B8]">{remaining} </span> : null;
            }
            return child;
          })}
        </div>
      </div>
    );
  },
};

function splitFrameworkKeywords(md: string): string {
  return md.replace(/\n\*\*(Exploits|Compensates|Provenance):\*\*/g, "\n\n**$1:**");
}

export default function ArticleRenderer({ content }: { content: string }) {
  const withoutTitle = content.replace(/^# .+\n+/, "");
  const preprocessed = splitFrameworkKeywords(withoutTitle);
  const sections = splitAtMechanics(preprocessed);

  return (
    <div>
      {sections.map((section, i) => {
        const visualNums = section.mechanicNum
          ? MECHANIC_VISUALS[section.mechanicNum] ?? []
          : [];
        return (
          <div key={i}>
            <div className="prose prose-lg max-w-none prose-headings:tracking-tighter prose-headings:font-bold prose-h3:mt-16 prose-p:leading-[1.75] prose-pre:font-mono prose-pre:bg-[#0f1629] prose-pre:text-[#e2e8f0] prose-code:text-foreground prose-strong:text-foreground prose-th:text-left prose-table:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {section.markdown}
              </ReactMarkdown>
            </div>
            {visualNums.map((vNum) => {
              const Visual = visuals[vNum];
              return (
                <figure key={vNum} className="my-12 overflow-hidden rounded-xl bg-[#0B0F1A]">
                  <div className="px-6 py-4 md:px-8 md:py-5">
                    <Visual />
                  </div>
                  <figcaption className="px-6 pb-3 font-mono text-xs text-[#64748B]">
                    Interactive visualization
                  </figcaption>
                </figure>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
