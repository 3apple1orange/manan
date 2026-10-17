import { siteConfig, type ResearchPaper } from "./site-config";

// Stable @id anchors. Never rename these once published.
export const IDS = {
  person: `${siteConfig.domain}/#person`,
  profilePage: `${siteConfig.domain}/about#profile-page`,
  ecto: `${siteConfig.ectoDomain}/#organization`,
  ssSolutions: `${siteConfig.domain}/#ss-solutions`,
  book: `${siteConfig.domain}/writing/meet-me-in-the-backyard#book`,
};

/** Global Person schema. Injected once, in the root layout. */
export function personSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": IDS.person,
    name: siteConfig.person.name,
    url: siteConfig.domain + "/",
    mainEntityOfPage: `${siteConfig.domain}/about`,
    description: siteConfig.person.introduction,
    jobTitle: siteConfig.person.jobTitles,
    knowsAbout: siteConfig.person.knowsAbout,
    homeLocation: { "@type": "Place", name: siteConfig.person.basedIn },
    email: `mailto:${siteConfig.contactEmail}`,
    worksFor: [
      { "@type": "Organization", "@id": IDS.ecto, name: siteConfig.ecto.name, url: siteConfig.ectoDomain },
      { "@type": "Organization", "@id": IDS.ssSolutions, name: siteConfig.ssSolutions.name },
    ],
  };
  if (siteConfig.person.primaryPortraitUrl) {
    schema.image = {
      "@type": "ImageObject",
      url: siteConfig.person.primaryPortraitUrl,
      caption: `${siteConfig.person.name}, founder of ${siteConfig.ecto.name}`,
    };
  }
  if (siteConfig.person.sameAs.length > 0) schema.sameAs = siteConfig.person.sameAs;
  return schema;
}

/** ProfilePage schema. /about only. */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": IDS.profilePage,
    url: `${siteConfig.domain}/about`,
    name: `About ${siteConfig.person.name}`,
    description: `Official profile of ${siteConfig.person.name}, founder of ${siteConfig.ecto.name}, proprietor of ${siteConfig.ssSolutions.name} and author of ${siteConfig.book.title}.`,
    mainEntity: { "@id": IDS.person },
  };
}

/** Book schema. Only verified edition fields are emitted. */
export function bookSchema() {
  const b = siteConfig.book;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": IDS.book,
    url: `${siteConfig.domain}/writing/meet-me-in-the-backyard`,
    name: b.title,
    author: { "@id": IDS.person },
    description: b.description,
    inLanguage: "en",
    bookFormat: "https://schema.org/EBook",
    datePublished: b.datePublished,
    numberOfPages: b.pages,
    identifier: { "@type": "PropertyValue", propertyID: "ASIN", value: b.asin },
  };
  if (b.isbn) schema.isbn = b.isbn;
  if (b.publisher) schema.publisher = { "@type": "Organization", name: b.publisher };
  return schema;
}

/** Research schema. A Zenodo deposit is a CreativeWork, not a journal
 *  ScholarlyArticle, so the type follows the verified status. */
export function researchSchema(paper: ResearchPaper) {
  const type = paper.status === "Published" && paper.journal ? "ScholarlyArticle" : "CreativeWork";
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${siteConfig.domain}/research#${paper.slug}`,
    name: paper.title,
    headline: paper.title,
    author: { "@id": IDS.person },
    abstract: paper.abstract,
    ...(paper.datePublished ? { datePublished: paper.datePublished } : {}),
    ...(paper.url ? { url: paper.url } : {}),
    ...(paper.doi
      ? {
          identifier: { "@type": "PropertyValue", propertyID: "DOI", value: paper.doi },
          sameAs: `https://doi.org/${paper.doi}`,
        }
      : {}),
    ...(paper.licence === "CC BY 4.0" ? { license: "https://creativecommons.org/licenses/by/4.0/" } : {}),
    ...(paper.version ? { version: paper.version } : {}),
  };
}

/** Organization schema for ECTO INDIA. /ecto-india only. */
export function ectoOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": IDS.ecto,
    name: siteConfig.ecto.name,
    url: siteConfig.ectoDomain,
    description: siteConfig.ecto.description,
    founder: [{ "@id": IDS.person }, { "@type": "Person", name: siteConfig.ecto.coFounder }],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.ecto.contactEmail,
    },
  };
}

/** Organization schema for S.S. Solutions. /ss-solutions only. */
export function ssSolutionsOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": IDS.ssSolutions,
    name: siteConfig.ssSolutions.name,
    description: siteConfig.ssSolutions.description,
    founder: { "@id": IDS.person },
  };
}