import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booktrailer",
};

const flow = [
  { step: "Add your book", body: "Drop in the manuscript or a few key details." },
  { step: "Set your look", body: "Pick a visual style that fits your book’s tone — moody literary, bright YA, cinematic thriller." },
  { step: "Generate", body: "Trailers, social posts, and ads are drafted in minutes — drawn straight from your characters and your world." },
  { step: "Edit and export", body: "Polish stills in the Canva-style image editor, fine-tune timing in the timeline, then export ready to post." },
];

export default function BooktrailerProjectPage() {
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
          Booktrailer
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          Bring your book to life. Trailers, social posts, and ads — drawn
          from your manuscript, your characters, your world.
        </p>
        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
          <time>2026-04-17</time>
          <span aria-hidden>·</span>
          <a
            href="https://booktrailer.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            booktrailer.io →
          </a>
        </div>
      </header>

      <div className="flex flex-col gap-10 leading-relaxed">
        <p>
          Most authors don’t have a marketing team, an editor, or a budget
          for a video studio — but the bar for a book launch on social keeps
          climbing. Booktrailer is a self-serve studio that takes a manuscript
          and ships finished marketing assets at the other end, without the
          author having to learn motion design.
        </p>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/booktrailer-hero.png"
            alt="Booktrailer landing page — “Bring your book to life. Trailers, social posts, and ads — drawn from your manuscript. Your characters, your world.”"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            One promise: every output is drawn from the book itself.
          </figcaption>
        </figure>

        <p>
          The trick is treating the manuscript as the source of truth.
          Characters, tone, setting, and key beats are extracted up front,
          then every stylistic choice — image editor, timeline, voiceover —
          pulls from that shared context so the result actually <em>feels</em>{" "}
          like the book.
        </p>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          The flow
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
            src="/projects/booktrailer-studio.png"
            alt="Booktrailer’s studio view — a Canva-style image editor with a watercolor portrait of Jay Gatsby on the canvas, and tools for templates, portraits, text, shapes, and layers."
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            “A studio that gets your book.” Image editor for stills and a
            timeline editor for video, both prefilled with your book’s
            characters and world.
          </figcaption>
        </figure>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          What’s in the studio
        </h2>
        <ul className="flex flex-col gap-1 text-sm text-muted">
          <li>Canva-style image editor with templates, portraits, text, shapes</li>
          <li>Timeline editor for shot length, pacing, and music</li>
          <li>A library that grows with you — start small, launch big</li>
        </ul>
      </div>
    </article>
  );
}
