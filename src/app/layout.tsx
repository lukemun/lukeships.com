import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Luke Ships",
    template: "%s | Luke Ships",
  },
  description: "Writing, visuals, and ideas from Luke Munro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="mx-auto min-h-screen max-w-2xl px-6 py-10 md:py-16">
          <header className="mb-20 flex items-baseline justify-between">
            <Link
              href="/"
              className="font-mono text-xs tracking-wide uppercase text-muted hover:text-foreground transition-colors"
            >
              luke ships
            </Link>
            <nav className="flex gap-5 font-mono text-xs text-muted">
              <Link
                href="/writing"
                className="hover:text-foreground transition-colors"
              >
                writing
              </Link>
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors"
              >
                projects
              </Link>
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                about
              </Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
