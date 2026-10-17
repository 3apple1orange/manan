import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden px-6 py-24 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-serif text-[12rem] leading-none text-ink/[0.05] md:text-[20rem]"
      >
        404
      </span>
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Error 404</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
          This page is not part of the arrangement.
        </h1>
        <p className="mx-auto mt-6 max-w-md font-serif italic text-muted">
          It may have moved, or it never existed. Either way, there is more worth seeing elsewhere.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-85">
            Return home
          </Link>
          <Link href="/about" className="rounded-full border border-ink/30 px-6 py-2.5 text-sm transition-colors hover:border-ink">
            Read the profile
          </Link>
        </div>
      </div>
    </section>
  );
}