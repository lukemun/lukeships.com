import Link from "next/link";

const posts = [
  {
    slug: "exploiting-llm-mechanics",
    title: "Exploiting the Actual Mechanics of LLMs: A Framework Atlas",
    date: "2026-02-14",
  },
];

export default function Home() {
  return (
    <div>
      <section className="mb-24 md:mb-32">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
          Luke
          <br />
          Munro
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-md leading-relaxed">
          Writing about AI, building things, and shipping ideas.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted mb-8">
          Recent
        </h2>
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="group block">
                <time className="font-mono text-xs text-muted">
                  {post.date}
                </time>
                <h3 className="mt-1 text-lg font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                  {post.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
