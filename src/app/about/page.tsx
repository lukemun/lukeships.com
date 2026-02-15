import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-lg">
      <div className="prose prose-lg prose-p:leading-[1.8] prose-p:text-foreground">
        <p>
          I&apos;m Luke. I&apos;m building{" "}
          <a href="https://askwooly.com">Wooly</a>, an AI
          assistant for marketing on Threads. Before that I was a Solutions
          Engineer at Sentry, where I showed up with zero sales experience and
          spent the next year closing six-figure deals with the NFL, X.com,
          Etsy, and Roblox. I like solving problems that cut across domains —
          naturally, I have an interest in startups. Most of them didn&apos;t
          work out.
        </p>
        <p>
          I attended USC and studied computer science, business, and
          screenwriting.
        </p>
        <p>This site is where I put the things I build and the things I write.</p>
      </div>
    </div>
  );
}
