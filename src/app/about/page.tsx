import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-lg">
      <div className="prose prose-lg prose-p:leading-[1.8] prose-p:text-foreground">
        <p>
          I&apos;m Luke. I build AI products and growth systems, usually where
          software, design, and distribution overlap.
        </p>
        <p>
          Before going independent, I worked at Amazon and later became a
          Solutions Engineer at Sentry, where I helped close six-figure deals
          with teams at the NFL, X, Etsy, and Roblox.
        </p>
        <p>
          I attended USC, where I studied computer science, business, and
          screenwriting.
        </p>
        <p>
          This site is where I document what I build, how it performs, and what
          I learn when the market says no.
        </p>
      </div>
    </div>
  );
}
