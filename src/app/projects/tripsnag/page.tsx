import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TripSnag",
};

export default function TripsnagProjectPage() {
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
          TripSnag
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">
          Travel together. Save together. Group flight bookings that unlock
          rates airlines normally only offer to companies and conferences.
        </p>
        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
          <time>2025-10-22</time>
          <span aria-hidden>·</span>
          <a
            href="https://tripsnag.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            tripsnag.ai →
          </a>
        </div>
      </header>

      <div className="flex flex-col gap-10 leading-relaxed">
        <p>
          Airlines run group booking programs — discounted fares, typically
          reserved for businesses and conferences, that kick in once you
          book eight or more passengers on the same route. Individual
          travelers never see those prices. TripSnag pools regular travelers
          into groups so they can.
        </p>

        <figure className="flex flex-col gap-2">
          <Image
            src="/projects/tripsnag-hero.png"
            alt="TripSnag landing page — “Travel Together. Save Together. Join group flight bookings and save up to 20% off list prices while chatting with fellow travelers on our forum.”"
            width={1512}
            height={836}
            className="rounded-lg border border-black/10 dark:border-white/10"
          />
          <figcaption className="font-mono text-xs text-muted">
            Half marketplace, half community — pool with other travelers
            heading the same way and split the savings.
          </figcaption>
        </figure>

        <p>
          The product is half marketplace, half community. Tell us where
          you’re trying to go; we notify you when enough other travelers
          want the same route to unlock the group rate, then we coordinate
          the booking with the airline. A forum lets the group plan together
          before the trip.
        </p>

        <h2 className="mt-2 text-sm font-mono uppercase tracking-wide text-muted">
          What it does
        </h2>
        <ul className="flex flex-col gap-1 text-sm text-muted">
          <li>Pools 8+ travelers per route to unlock group fares</li>
          <li>Up to 20% off list prices vs. Google Flights / Kayak</li>
          <li>Notifications when a group forms for a route on your wishlist</li>
          <li>Community forum to plan the trip with the rest of the group</li>
          <li>Interactive globe + filterable deals browser for discovery</li>
        </ul>

        <h2 className="mt-4 text-sm font-mono uppercase tracking-wide text-muted">
          Under the hood
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          A hybrid AWS + GCP pipeline. Fargate crawlers running Playwright
          and Crawlee scrape Google Flights, Lambdas orchestrate the workflow
          through Step Functions and an SQS queue, millions of flight records
          land in Supabase Postgres, and Mastra AI agents enrich the data
          where the scrapers can’t reach (transportation, attractions,
          on-the-ground travel info).
        </p>
      </div>
    </article>
  );
}
