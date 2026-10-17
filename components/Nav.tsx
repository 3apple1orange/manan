"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = siteConfig.nav.slice(1);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-40 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-[family-name:var(--font-signature)] text-muted" style={{ fontSize: "1.8rem" }}>
          {siteConfig.person.name}
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-ink ${pathname === item.href ? "text-ink" : "text-muted"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col overflow-y-auto bg-paper px-6 pb-10 pt-4 md:hidden"
          >
            <nav aria-label="Mobile">
              <ol className="border-t border-line">
                {links.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link href={item.href} className="flex items-center justify-between border-b border-line py-4">
                        <span className="flex items-baseline gap-4">
                          <span className="w-6 font-serif text-xs italic text-muted">0{i + 1}</span>
                          <span className={`font-serif text-[1.75rem] leading-none ${active ? "text-ink" : "text-ink/75"}`}>
                            {item.label}
                          </span>
                        </span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-label="Current page" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-auto pt-10"
            >
              <div className="grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-muted">
                {siteConfig.footerLinks.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <a href={`mailto:${siteConfig.contactEmail}`} className="mt-8 block font-serif text-lg">
                {siteConfig.contactEmail}
              </a>
              <p className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted">
                {siteConfig.person.locations.join("  ·  ")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}