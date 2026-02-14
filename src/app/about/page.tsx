import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-lg">
      <div className="prose prose-lg prose-p:leading-[1.8] prose-p:text-foreground">
        <p>
          I&apos;m Luke. I write about how AI actually works under the hood and
          how to build things with it that aren&apos;t terrible.
        </p>
        <p>
          This site is where I put the things I ship — writing, visuals, and
          whatever else seems worth sharing.
        </p>
      </div>
    </div>
  );
}
