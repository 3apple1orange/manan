import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { bookSchema } from "@/lib/schema";
import BookParallaxGallery from "@/components/BookParallaxGallery";
import BookThemes from "@/components/BookThemes";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import DrawLine from "@/components/motion/DrawLine";
import ClipReveal from "@/components/motion/ClipReveal";

const book = siteConfig.book;
const formats = book.editions.map((e) => e.format);

export const metadata = buildMetadata({
  title: `${book.title} | Book by ${siteConfig.person.name}`,
  description: `${book.title} is a book by ${siteConfig.person.name}: a work of philosophical reflection on identity, fear and the private life of the mind.`,
  path: "/writing/meet-me-in-the-backyard",
});

const edition = [
  { label: "Author", value: book.author },
  { label: "Formats", value: formats.join(" · ") },
  { label: "Published", value: `${book.datePublishedLabel} (Kindle)` },
  { label: "Length", value: `${book.pages} pages` },
  { label: "Language", value: book.language },
  { label: "ASIN", value: book.asin },
];

function BuyButton({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const styles =
    variant === "dark"
      ? "border-ink text-ink hover:bg-ink hover:text-paper"
      : "border-paper text-paper hover:bg-paper hover:text-ink";
  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener"
      className={`group inline-flex items-center gap-3 rounded-full border px-7 py-3 text-sm tracking-wide transition-colors duration-500 ${styles}`}
    >
      Buy the book
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </a>
  );
}

export default function BookPage() {
  return (
    <>
      <JsonLd data={bookSchema()} />

      {/* Opener */}
      <header className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center md:pt-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">Writing · A book by {book.author}</p>
        </Reveal>
        <WordReveal as="h1" text={book.title} className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl" stagger={0.08} />
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-prose font-serif text-lg italic text-muted md:text-xl">{book.description}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">{formats.join(" · ")}</p>
          <div className="mt-6">
            <BuyButton />
          </div>
          <p className="mt-3 text-xs text-muted">Available in Kindle, paperback and hardcover.</p>
        </Reveal>
      </header>

      <div className="flex justify-center pb-6">
        <span className="relative text-xs uppercase tracking-wide opacity-40 after:absolute after:left-1/2 after:top-full after:h-12 after:w-px after:bg-gradient-to-b after:from-current after:to-transparent after:content-['']">
          scroll to see
        </span>
      </div>

      <BookParallaxGallery />

      {/* I · Synopsis */}
      <section className="px-6 py-20 md:py-28 lg:py-36">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[200px_1fr] lg:gap-20">
          <aside className="self-start lg:sticky lg:top-28">
            <Reveal>
              <span aria-hidden="true" className="block font-serif text-[5rem] leading-none text-ink/10 lg:text-[8rem]">I</span>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">Synopsis</p>
            </Reveal>
          </aside>

          <div>
            <WordReveal
              text="A book about the private life of the mind, and the stories it tells to keep itself safe."
              className="font-serif text-3xl leading-[1.25] md:text-4xl lg:text-[2.8rem]"
              stagger={0.035}
              highlight={["safe"]}
            />

            <Reveal delay={0.1} className="mt-12">
              <div className="text-[1.05rem] leading-[1.8] text-muted lg:columns-2 lg:gap-12">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-ink">
                  {book.title} is a work of philosophical reflection. It moves through identity, fear,
                  mortality and desire, not as abstractions, but as forces that shape the small, private
                  decisions of an ordinary life.
                </p>
                <p className="mt-6 lg:mt-0">
                  The backyard of the title is the private mind: the space behind the house that few
                  visitors ever see, where the questions we avoid are quietly kept. The book is an
                  invitation to step out there, and stay a while.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Display line */}
      <section className="overflow-hidden border-y border-line py-14 md:py-20 lg:py-24">
        <WordReveal
          as="p"
          text="Identity. Fear. The private life of the mind."
          className="px-6 text-center font-serif text-4xl italic leading-tight md:text-6xl lg:text-7xl"
          stagger={0.09}
          highlight={["mind"]}
        />
      </section>

      {/* II · Themes */}
      <section className="px-6 py-20 md:py-28 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[200px_1fr] lg:gap-20">
          <aside className="self-start lg:sticky lg:top-28">
            <Reveal>
              <span aria-hidden="true" className="block font-serif text-[5rem] leading-none text-ink/10 lg:text-[8rem]">II</span>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">Themes</p>
            </Reveal>
          </aside>
          <div>
            <BookThemes themes={book.themes} />
            <DrawLine />
          </div>
        </div>
      </section>

      {/* III · The Edition */}
      <section className="px-4 pb-24 md:px-6 md:pb-32">
        <ClipReveal className="mx-auto max-w-6xl overflow-hidden bg-ink text-paper">
          <div className="grid gap-12 px-8 py-14 md:px-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-paper/50">III · The Edition</p>
              <p className="mt-6 font-[family-name:var(--font-signature)] text-5xl leading-none text-paper/90 md:text-6xl">
                {book.title}
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
                Available in Kindle, paperback and hardcover.
              </p>
              <div className="mt-8">
                <BuyButton variant="light" />
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px self-end bg-paper/15">
              {edition.map((item, i) => (
                <Reveal key={item.label} delay={0.08 * i} y={16} blur={4} className="bg-ink p-5">
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-paper/50">{item.label}</dt>
                  <dd className="mt-2 font-serif text-lg">{item.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </ClipReveal>
      </section>
    </>
  );
}