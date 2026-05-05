import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AskWooly",
};

const pillars = [
  {
    title: "Create",
    body: "A distraction-free editor for multi-post threads — no feed, no doomscroll, just the post you’re writing.",
  },
  {
    title: "Schedule",
    body: "Plan weeks of content in minutes. Calendar view shows gaps so you can keep a steady rhythm.",
  },
  {
    title: "Analytics",
    body: "Audience, geography, demographics, post-level performance — the things that actually drive growth on Threads.",
  },
  {
    title: "Engage",
    body: "One inbox for replies and DMs across your threads, instead of digging through the app to find them.",
  },
  {
    title: "Wooly",
    body: "An AI sidekick that draws out your ideas and shapes them into posts that still sound unmistakably like you.",
  },
];

export default function AskWoolyProjectPage() {
  return (
    <article>
      <header className="mb-12">
        <Link
          href="/projects"
          className="font-mono text-xs text-muted hover:text-foreground transition-colors"
        >
          ← projects
        </Link>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tighter">
          AskWooly
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          A command center for growing on Threads — write, schedule, analyze,
          and engage from one place.
        </p>
        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
          <time>2026-02-25</time>
          <span aria-hidden>·</span>
          <a
            href="https://askwooly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            askwooly.com →
          </a>
        </div>
      </header>

      <div className="flex flex-col gap-10 leading-relaxed">
        <p>
          Threads creators stitch their workflow together from the native app,
          a notes doc, a scheduler, and a spreadsheet of analytics. AskWooly
          collapses all of that into a single workspace built around the way
          posting actually works — drafts, threads, scheduling, replies, and
          performance all in one tool.
        </p>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/askwooly-compose.png"
            alt="The AskWooly composer — a multi-post thread draft with a sidebar for Content, Engage, Calendar, Analytics, Workflows, and Inspiration."
            width={1488}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            Distraction-free composer. Multi-post threads, drag-and-drop media,
            auto-save, and ⌘+Enter to add a post.
          </figcaption>
        </figure>

        <p>
          The five pillars of the product:
        </p>

        <ul className="flex flex-col gap-4">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wide text-muted">
                {pillar.title}
              </span>
              <span className="text-sm leading-relaxed">{pillar.body}</span>
            </li>
          ))}
        </ul>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/askwooly-analytics.png"
            alt="AskWooly Audience analytics — interactive globe of global reach, country breakdown, and age and gender distributions."
            width={1488}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            Audience analytics — global reach, geography, and demographics
            pulled from the Threads API.
          </figcaption>
        </figure>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          Stack
        </h2>
        <ul className="flex flex-col gap-1 text-sm text-muted">
          <li>Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui</li>
          <li>FastAPI + Pydantic backend</li>
          <li>Supabase Postgres, Supabase Auth + Threads OAuth</li>
          <li>SST on AWS Lambda</li>
        </ul>
      </div>
    </article>
  );
}
