import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

type Project = {
  href: string;
  title: string;
  description: string;
  date: string;
};

const projects: Project[] = [
  {
    href: "/projects/booktrailer",
    title: "Booktrailer — bring your book to life",
    description:
      "A self-serve studio for authors: trailers, social posts, and ads — drawn straight from your manuscript, your characters, your world.",
    date: "2026-04-17",
  },
  {
    href: "/projects/askwooly",
    title: "AskWooly — a command center for Threads",
    description:
      "Write, schedule, analyze, and engage from one workspace. Five pillars — Create, Schedule, Analytics, Engage, and Wooly the AI sidekick.",
    date: "2026-02-25",
  },
  {
    href: "/door",
    title: "Let Me In — a 3D door you have to knock on",
    description:
      "A 3D door opening built with CSS transforms. Press the letters, watch the ink spread, and the doors swing open to reveal the site.",
    date: "2026-02-15",
  },
  {
    href: "/projects/tripsnag",
    title: "TripSnag — travel together, save together",
    description:
      "Group flight bookings that unlock airline group rates — typically reserved for companies and conferences — for regular travelers.",
    date: "2025-10-22",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
        Projects
      </h1>
      <ul className="flex flex-col gap-8">
        {projects.map((project) => (
          <li key={project.href}>
            <Link href={project.href} className="group block">
              <time className="font-mono text-xs text-muted">
                {project.date}
              </time>
              <h3 className="mt-1 text-lg font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
