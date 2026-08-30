import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MakeTrailer",
};

const flow = [
  { step: "The Foundation", body: "Feed the platform a synopsis or chapter. The AI extracts character attributes, you lock in an art style, and it generates a consistent 'Meet the Cast' visual anchor." },
  { step: "Reader Invitations", body: "Turn text into social media carousels. The AI analyzes your text for the core hook and generates a specific visual brief with promotional copy." },
  { step: "Passage Adaptation", body: "Paste in a chapter, and the system acts like a director—writing a reading script, planning shots, and dropping panels onto a semantic canvas." },
  { step: "Semantic Layout Canvas", body: "Agents place speech bubbles, thoughts, and text onto safe zones so typography never covers a character's face." },
];

export default function MakeTrailerProjectPage() {
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
          MakeTrailer
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          An AI design canvas and market-research engine for authors.
        </p>
        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
          <time>2026-08-19</time>
          <span aria-hidden>·</span>
          <a
            href="https://maketrailer.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            maketrailer.io →
          </a>
        </div>
      </header>

      <div className="flex flex-col gap-10 leading-relaxed">
        <p>
          Authors spend months writing their stories, but marketing them requires
          a steady supply of covers, ads, and social creative. MakeTrailer read
          the manuscript, extracted its characters and visual language, and
          turned that context into controlled, editable design assets.
        </p>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/maketrailer-canvas.png"
            alt="MakeTrailer design canvas showing the editing interface"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            The unified design canvas gives access to top image models without typing raw prompts.
          </figcaption>
        </figure>

        <p>
          At the core of the app is a bespoke &quot;agentic&quot; architecture—powered by Next.js, Supabase, LLMs for narrative extraction, and fal.ai for image generation. Instead of disjointed tools, everything is orchestrated through automated &quot;Quickstarts&quot; that pull context directly from the manuscript.
        </p>
        
        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/maketrailer-quickstart.png"
            alt="MakeTrailer Quickstart Interface"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            The automated Quickstarts interface pulling context directly from your manuscript.
          </figcaption>
        </figure>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          Genre Cover Trends
        </h2>

        <p>
          Before asking authors to try the product, I wanted to give them
          something immediately useful. I built Genre Cover Trends, a system
          that analyzed bestselling Amazon covers and identified the visual
          patterns within individual genres and subgenres.
        </p>

        <p>
          It examined art style, typography, color, subject matter,
          composition, and what survived at thumbnail size. The findings became
          mobile-first reports authors could use while planning their own
          covers. Those reports became MakeTrailer&apos;s lead magnet and generated
          more than 50 leads.
        </p>

        <p>
          The research also improved the product. I created human-scored
          evaluations for art-style recognition, studied where the system
          failed, and refined its taxonomy and prompts. On our internal
          benchmark, the resulting pipeline scored higher than the GPT baseline
          at recognizing cover art styles.
        </p>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          The Workflow
        </h2>
        <ol className="flex flex-col gap-3">
          {flow.map((item, i) => (
            <li key={item.step} className="flex gap-4">
              <span className="font-mono text-xs text-muted w-4 shrink-0 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-medium">{item.step}</div>
                <div className="text-sm text-muted leading-relaxed">
                  {item.body}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/maketrailer-character-brief.png"
            alt="MakeTrailer Character Portrait Brief"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            Character Introductions: The visual brief pulling attributes directly from the book to generate highly consistent portraits.
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/maketrailer-showcase.jpg"
            alt="MakeTrailer Reader Invitation card"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            Reader Invitations: Turning text into highly specific visual briefs paired with promotional copy.
          </figcaption>
        </figure>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          Why I Pivoted
        </h2>

        <p>
          The product worked, but the market was moving in the opposite
          direction. AI had become a reputational risk in publishing. That
          became especially clear when Jerry Falade&apos;s reported $2 million book
          deal collapsed amid questions about possible AI use, despite his
          denial of the allegations.{" "}
          <a
            href="https://www.publishersweekly.com/pw/by-topic/industry-news/publisher-news/article/100983-after-the-cancellation-of-call-me-i-ll-hide-the-body-what-comes-next.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            Publishers Weekly covered the dispute
          </a>
          .
        </p>

        <p>
          Authors still needed better marketing, but many no longer wanted AI
          associated with their creative work. MakeTrailer asked them to
          publicly embrace the exact label they were increasingly trying to
          avoid. I eventually pivoted away from the product.
        </p>
      </div>
    </article>
  );
}
