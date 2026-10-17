import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {siteConfig.person.name}
        </span>
        <ul className="flex gap-6">
          {siteConfig.footerLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
