import Link from "next/link";
import { ProjectList } from "@/components/ProjectList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { caseStudies, craft, socials } from "@/lib/content";

export default function Home() {
  return (
    <div className="mx-auto max-w-[692px] px-6 py-12 sm:py-16">
      <header className="mb-24 flex items-start justify-between sm:mb-32">
        <div className="rise flex flex-col items-start">
          <Link href="/" className="font-medium">
            Kajol Davda
          </Link>
          <span className="font-medium leading-none text-muted">
            Product Designer
          </span>
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            Open to internships & entry-level roles
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main>
        <section className="rise" style={{ animationDelay: "60ms" }}>
          <span className="mb-5 block font-medium sm:mb-6">Today</span>
          <p className="text-muted">
            I&rsquo;m a product designer looking for an internship or an
            entry-level role. I like working on consumer brands and e-commerce —
            the kind of product where a small change in a flow shows up in the
            numbers the same week.
          </p>
          <p className="mt-4 text-muted">
            I design in{" "}
            <span className="text-[var(--text)]">Figma</span>, build and ship in{" "}
            <span className="text-[var(--text)]">Framer</span>, and use{" "}
            <span className="text-[var(--text)]">Claude</span> to move faster
            between the two.
          </p>
        </section>

        <section
          className="rise -mb-3 mt-16 sm:mt-32"
          style={{ animationDelay: "120ms" }}
        >
          <span className="mb-5 block font-medium sm:mb-4">Projects</span>
          <ProjectList projects={caseStudies} />
        </section>

        <section
          className="rise -mb-3 mt-16 sm:mt-28"
          style={{ animationDelay: "160ms" }}
        >
          <span className="mb-5 block font-medium sm:mb-4">Craft</span>
          <p className="mb-5 text-muted sm:mb-4">
            Interface studies and one-off screens, made to keep my hands sharp.
          </p>
          <ProjectList projects={craft} />
        </section>

        <section
          className="rise mt-16 sm:mt-32"
          style={{ animationDelay: "200ms" }}
        >
          <span className="mb-5 block font-medium sm:mb-6">Connect</span>
          <p className="text-muted">
            You can find me on{" "}
            <a
              className="link"
              href={socials.x.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>{" "}
            and{" "}
            <a
              className="link"
              href={socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            , or write to me at{" "}
            <a className="link" href={socials.email.href}>
              {socials.email.label}
            </a>
            .
          </p>
        </section>

        <footer className="mt-16 border-t border-[var(--border)] pt-6 sm:mt-32">
          <span className="font-mono text-[12px] text-faint">
            © {new Date().getFullYear()} Kajol Davda
          </span>
        </footer>
      </main>
    </div>
  );
}
