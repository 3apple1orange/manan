import type { Metadata } from "next";
import { Allura } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { personSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import MotionProvider from "@/components/MotionProvider";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.person.name} | Founder of ECTO India and Writer`,
    template: `%s | ${siteConfig.person.name}`,
  },
  description: `${siteConfig.person.name} is the founder of ${siteConfig.ecto.name} and proprietor of ${siteConfig.ssSolutions.name}, working across mobility, public systems, philosophy and writing.`,
  alternates: { canonical: siteConfig.domain },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={allura.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <JsonLd data={personSchema()} />
        <MotionProvider>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}