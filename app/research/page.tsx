import { buildMetadata } from "@/lib/seo";
import { siteConfig, researchPapers, type ResearchPaper } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { researchSchema } from "@/lib/schema";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import DrawLine from "@/components/motion/DrawLine";
import ClipReveal from "@/components/motion/ClipReveal";
import CopyButton from "@/components/CopyButton";
import ResearchPreview from "@/components/ResearchPreview";
import ResearchEndorsement from "@/components/ResearchEndorsement";

export const metadata = buildMetadata({
  title: `Research and Publications | ${siteConfig.person.name}`,
  description: `Research by ${siteConfig.person.name} on urban mobility, platformisation and public systems in smaller Indian cities.`,
  path: "/research",
});

/** e.g. Singla, M. (2026). Title (Version v1) [Research manuscript]. Zenodo. https://doi.org/... */
function citationFor(paper: ResearchPaper) {
  const [first, ...rest] = siteConfig.person.name.split(" ");
  const author = `${rest.join(" ")}, ${first.charAt(0)}.`;
  const year = paper.datePublished ? paper.datePublished.slice(0, 4) : "n.d.";
  const version = paper.version ? ` (Version ${paper.version})` : "";
  const doi = paper.doi ? ` https://doi.org/${paper.doi}` : "";
  return `${author} (${year}). ${paper.title}${version} [Research manuscript]. ${paper.repository ?? ""}.${doi}`;
}

export default function ResearchPage() {
  const openAccess = researchPapers.some((p) => p.licence?.startsWith("CC"));
  const years = researchPapers.map((p) => p.datePublished?.slice(0, 4)).filter(Boolean);

  return (
    <>
      {researchPapers.map((paper) => (
        <JsonLd key={paper.slug} data={researchSchema(paper)} />
      ))}

      <div className="px-6 py-20 md:py-28">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center">
          <Reveal y={12}>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Research</p>
          </Reveal>
          <WordReveal
            as="h1"
            text="Research & Publications"
            className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl"
            stagger={0.08}
            highlight={["publications"]}
            highlightClassName="font-[family-name:var(--font-signature)] text-[1.15em] leading-none text-muted"
          />
          <Reveal delay={0.4}>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-muted md:text-xl">
              Work on mobility, labour and public systems, read as different angles on the same
              underlying questions.
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-muted">
              {String(researchPapers.length).padStart(2, "0")} {researchPapers.length === 1 ? "work" : "works"}
              {openAccess && "  ·  Open access"}
              {years.length > 0 && `  ·  ${years[0]}`}
            </p>
          </Reveal>
        </header>

        {researchPapers.map((paper, index) => {
          const citation = citationFor(paper);
          return (
            <div key={paper.slug} className="mx-auto mt-20 max-w-6xl md:mt-28">
              <DrawLine />

              {/* The paper */}
              <article id={paper.slug} className="grid gap-14 pt-14 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:pt-20">
                {paper.previewImage && (
                  <div className="self-start lg:sticky lg:top-28">
                    <ResearchPreview
                      src={paper.previewImage}
                      alt={`First page of ${paper.title} by ${siteConfig.person.name}`}
                      caption={`${paper.repository ?? "Manuscript"} · ${paper.version ?? ""} · ${paper.licence ?? ""}`}
                    />
                  </div>
                )}

                <div>
                  <Reveal y={12}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                      </span>
                      {paper.statusLabel}
                    </span>
                  </Reveal>

                  <WordReveal
                    as="h2"
                    text={paper.title}
                    className="mt-6 font-serif text-3xl leading-[1.15] md:text-[2.6rem]"
                    stagger={0.03}
                  />

                  <Reveal delay={0.2}>
                    <p className="mt-6 flex items-baseline gap-3 text-sm text-muted">
                      By
                      <span className="font-[family-name:var(--font-signature)] text-3xl text-ink">
                        {siteConfig.person.name}
                      </span>
                      {paper.coAuthors?.length ? <span>with {paper.coAuthors.join(", ")}</span> : null}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1} className="mt-10">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">Abstract</p>
                    <p className="mt-4 text-[1.05rem] leading-[1.85] text-muted first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-ink">
                      {paper.abstract}
                    </p>
                  </Reveal>

                  <dl className="mt-10 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
                    {[
                      { label: "Repository", value: paper.repository },
                      { label: "Deposited", value: paper.dateLabel },
                      { label: "Version", value: paper.version },
                      { label: "Licence", value: paper.licence },
                    ]
                      .filter((d) => d.value)
                      .map((d, i) => (
                        <Reveal key={d.label} delay={0.08 * i} y={12} blur={4} className="bg-paper px-3 py-4">
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">{d.label}</dt>
                          <dd className="mt-1 font-serif text-lg">{d.value}</dd>
                        </Reveal>
                      ))}
                  </dl>

                  <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener"
                        className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-85"
                      >
                        Read on {paper.repository ?? "the repository"}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </a>
                    )}
                    <CopyButton text={citation} />
                  </Reveal>
                  {paper.doi && (
                    <p className="mt-4 text-xs text-muted">DOI {paper.doi}</p>
                  )}
                </div>
              </article>

              {/* Endorsement: full width, shown once */}
              {index === 0 && (
                <div className="mt-24 md:mt-32">
                  <ResearchEndorsement />
                </div>
              )}

              {/* Key ideas */}
              {paper.keyIdeas && paper.keyIdeas.length > 0 && (
                <section className="mt-24 md:mt-32">
                  <Reveal y={12}>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">Key ideas</p>
                  </Reveal>
                  {paper.takeaway && (
                    <WordReveal
                      text={paper.takeaway}
                      className="mt-6 max-w-4xl font-serif text-3xl leading-[1.2] md:text-5xl"
                      stagger={0.035}
                      highlight={["adapting"]}
                    />
                  )}
                  <div className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {paper.keyIdeas.map((idea, i) => (
                      <Reveal key={idea.title} delay={0.12 * i} y={30} className="bg-paper">
                        <div className="group h-full p-6 transition-colors duration-500 hover:bg-ink hover:text-paper md:p-8">
                          <span className="font-serif text-4xl text-ink/15 transition-colors duration-500 group-hover:text-paper/30">
                            0{i + 1}
                          </span>
                          <h3 className="mt-6 font-serif text-xl">{idea.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70">
                            {idea.text}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}

              {/* Cite this work */}
              <section className="mt-24 md:mt-32">
                <ClipReveal className="overflow-hidden bg-ink text-paper">
                  <div className="grid gap-10 px-8 py-14 md:grid-cols-[200px_1fr] md:px-14 md:py-16">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-paper/50">Cite this work</p>
                      <p className="mt-4 font-[family-name:var(--font-signature)] text-4xl text-paper/80">Reference</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg leading-relaxed text-paper/90 md:text-xl">{citation}</p>
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <CopyButton text={citation} variant="light" />
                        {paper.licence && (
                          <span className="text-xs text-paper/50">Shared under {paper.licence}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </ClipReveal>
              </section>
            </div>
          );
        })}

        <Reveal className="mx-auto mt-20 max-w-6xl text-center">
          <p className="text-sm italic text-muted">More work will be listed here as it is completed.</p>
        </Reveal>
      </div>
    </>
  );
}