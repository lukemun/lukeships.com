import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
};

const posts = [
  {
    slug: "exploiting-llm-mechanics",
    title: "Exploiting the Actual Mechanics of LLMs: A Framework Atlas",
    date: "2026-02-14",
    readingTime: "15 min",
  },
];

export default function WritingPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
        Writing
      </h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className="group flex gap-4 items-baseline">
              <time className="font-mono text-xs text-muted shrink-0 w-24">
                {post.date}
              </time>
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {post.readingTime}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
