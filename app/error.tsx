"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70vh] place-items-center px-6 py-24 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Something went wrong</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">A brief moment of disorder.</h1>
        <p className="mx-auto mt-6 max-w-md font-serif italic text-muted">
          The page did not load as it should. Try again, or return home.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-85"
          >
            Try again
          </button>
          <Link href="/" className="rounded-full border border-ink/30 px-6 py-2.5 text-sm transition-colors hover:border-ink">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}