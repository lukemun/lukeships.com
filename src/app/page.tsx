import Link from "next/link";

const recent = [
  {
    href: "/projects/booktrailer",
    title: "Booktrailer — bring your book to life",
    date: "2026-04-17",
    type: "project",
  },
  {
    href: "/projects/askwooly",
    title: "AskWooly — a command center for Threads",
    date: "2026-02-25",
    type: "project",
  },
  {
    href: "/door",
    title: "Let Me In — a 3D door you have to knock on",
    date: "2026-02-15",
    type: "project",
  },
  {
    href: "/writing/exploiting-llm-mechanics",
    title: "Exploiting the Actual Mechanics of LLMs: A Framework Atlas",
    date: "2026-02-14",
    type: "writing",
  },
  {
    href: "/projects/tripsnag",
    title: "TripSnag — travel together, save together",
    date: "2025-10-22",
    type: "project",
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
          {recent.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block">
                <div className="flex items-baseline gap-3">
                  <time className="font-mono text-xs text-muted">{item.date}</time>
                  <span className="font-mono text-xs text-muted">{item.type}</span>
                </div>
                <h3 className="mt-1 text-lg font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                  {item.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
