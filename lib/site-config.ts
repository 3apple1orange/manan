// SINGLE SOURCE OF TRUTH
// Every page, schema object and metadata block reads from here.
// Anything marked VERIFY / TO FILL still needs confirmation from the client.

export const siteConfig = {
  domain: "https://www.manansingla.com",
  ectoDomain: "https://www.ectoindia.com",
  contactEmail: "m@manansingla.com", // personal + press enquiries

  person: {
    name: "Manan Singla",
    positioningStatement:
      "Founder and writer working across mobility, public systems, philosophy and the private life of the mind.",
    introduction:
      "Manan Singla is an entrepreneur and author based in Mumbai and the San Francisco Bay Area, whose work spans urban mobility, municipal services, diamonds and international trade, and philosophical writing. He is the founder of ECTO INDIA and the author of Meet Me in the Backyard.",
    onlinePresence:
      "I keep a limited presence online and prefer longer work, direct conversations and time away from the feed.",
    // Used in Google's data and the media kit.
    // VERIFY: switch "Proprietor" to "Director" only if S.S. Solutions is now a registered company.
    jobTitles: [
      "Founder, ECTO INDIA",
      "Proprietor, S.S. Solutions",
      "Author, Meet Me in the Backyard",
    ],
    // Homepage name cycle
    attributes: ["Entrepreneur", "Writer", "Investor"],
    locations: ["Mumbai, India", "San Francisco Bay Area, US"],
    basedIn: "Mumbai, India · San Francisco Bay Area, US",
    // Homepage top-right corner
    titles: ["Founder", "Writer", "Director, S.S. Solutions", "Diamond merchant"],
    activeSince: "2024",
    knowsAbout: [
      "Urban mobility",
      "Auto-rickshaw mobility",
      "Tier 2 and Tier 3 cities",
      "Municipal services",
      "Platformisation",
      "Diamond trade",
      "Philosophy",
      "Identity",
      "Fear",
    ],
    // Only verified profiles of this same person.
    sameAs: ["https://www.linkedin.com/in/manan-singla-548716271/"] as string[],
    primaryPortraitUrl: "", // set once the final portrait has a permanent URL
  },

  ecto: {
    name: "ECTO INDIA",
    description:
      "ECTO INDIA is developing an auto-rickshaw mobility platform, with trial operations across 11 cities in Uttar Pradesh, Haryana and Punjab.",
    stage: "Trial operations in 11 cities",
    activeSince: "February 2024", // venture start, NOT an incorporation date
    founder: "Manan Singla",
    coFounder: "Vansh Gehlot",
    contactEmail: "contact@ectoindia.com",
    trialCities: [
      { state: "Uttar Pradesh", cities: ["Aligarh", "Muzaffarnagar", "Rampur", "Shahjahanpur"] },
      { state: "Haryana", cities: ["Kaithal", "Bhiwani", "Sirsa", "Cheeka"] },
      { state: "Punjab", cities: ["Sangrur", "Pathankot", "Moga"] },
    ],
  },

  ssSolutions: {
    name: "S.S. Solutions",
    legalForm: "Sole Proprietorship", 
    proprietor: "Manan Singla",
    established: "April 2025",
    website: "https://thesssolutions.in", 
    description:
      "S.S. Solutions undertakes municipal and tender-based service work, including mechanised road sweeping in Kurukshetra, Haryana.",
    featuredProject: {
      title: "Mechanised road sweeping",
      location: "Kurukshetra, Haryana",
      summary:
        "Ongoing municipal sweeping work in Kurukshetra, Haryana. Client, contract reference, machine details and operating results will be added once confirmed against the work order.",
    },
  },

  diamonds: {
    name: "Diamonds & International Trade",
    company: "", // TO FILL: trading or company name, once the client confirms
    role: "", // TO FILL: Manan's role, e.g. "Founder"
    website: "", // TO FILL when there is one
    summary:
      "Sourcing, cross-border commerce and Rapaport-based pricing, from Mumbai and Surat to New York.",
    description:
      "From the trading floors of Bharat Diamond Bourse, Mumbai, and the diamond capital of Surat to the international markets of New York. With a foundation at HRD Antwerp, Belgium, the venture navigates sourcing, cross-border commerce and Rapaport-based pricing: where rarity meets liquidity, and value is a matter of precision.",
    markets: ["Mumbai", "Surat", "New York"],
    foundation: "HRD Antwerp, Belgium",
    pricing: "Rapaport-based",
    video: "/showreel/diamonds-reel.mp4",
    videoPoster: "/images/diamonds/reel-poster.png",
    photos: [
      { src: "/images/diamonds/certificate-1.jpeg", alt: "Manan Singla at HRD Antwerp" },
      { src: "/images/diamonds/certificate-2.jpeg", alt: "Manan Singla at HRD Antwerp" },
    ],
  },

  book: {
    title: "Meet Me in the Backyard",
    author: "Manan Singla",
    description:
      "A work of philosophical reflection on identity, fear and the private life of the mind.",
    status: "Published",
    format: "Kindle edition",
    datePublished: "2026-07-11",
    datePublishedLabel: "11 July 2026",
    pages: 458, // as supplied; confirm for the print edition
    language: "English",
    asin: "B0H8JFNH8F",
    amazonUrl: "https://www.amazon.in/Meet-Me-Backyard-Manan-Singla-ebook/dp/B0H8JFNH8F",
    // A buy button appears only for editions with a link
    editions: [
      { format: "Kindle", url: "https://www.amazon.in/Meet-Me-Backyard-Manan-Singla-ebook/dp/B0H8JFNH8F" },
      { format: "Paperback", url: "" }, // TO FILL: paste the purchase link
      { format: "Hardcover", url: "" }, // TO FILL: paste the purchase link
    ],
    isbn: "", // print ISBN pending
    publisher: "", // imprint pending per edition. Never enter "Amazon" here.
    themes: ["Identity", "Fear", "Mortality", "Desire", "The private mind"],
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Logic", href: "/logic" },
    { label: "Ventures", href: "/ventures" },
    { label: "Writing", href: "/writing/meet-me-in-the-backyard" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],

    footerLinks: [
    { label: "Press", href: "/press" },
    { label: "Media Kit", href: "/media-kit" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

} as const;

// ───────────── Research ─────────────

export interface ResearchPaper {
  slug: string;
  title: string;
  status: "Repository deposit" | "Submitted" | "Under review" | "Accepted" | "Forthcoming" | "Published";
  statusLabel: string;
  abstract: string;
  coAuthors?: string[];
  repository?: string;
  journal?: string;
  datePublished?: string;
  dateLabel?: string;
  doi?: string;
  url?: string;
  version?: string;
  previewImage?: string;
  takeaway?: string;
  keyIdeas?: { title: string; text: string }[];
  licence?: string;
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: "platformisation-smaller-indian-cities",
    title:
      "Platformisation in Smaller Indian Cities: Informal Institutions, Labour and Technology Adoption in Urban Mobility",
    status: "Repository deposit",
    statusLabel: "Research manuscript · Deposited on Zenodo",
    // Summary of the Zenodo abstract. Paste the exact abstract before launch.
    abstract:
      "What happens when digital mobility platforms designed for India's metros are extended to smaller cities? This paper argues that outcomes depend less on technology design or demand forecasts than on local informal institutions such as driver unions and route-sharing norms, platform incentives for labour, state regulation of aggregators, and local perceptions of trust and fairness. Drawing on academic, government and industry sources, including open-network alternatives, it concludes that platformisation in smaller cities requires institutional adaptation rather than copying metropolitan models.",
    repository: "Zenodo",
    datePublished: "2026-09-08",
    dateLabel: "8 September 2026",
    doi: "10.5281/zenodo.22656570",
    url: "https://zenodo.org/records/22656570",
    version: "v1",
    licence: "CC BY 4.0",
    previewImage: "/images/gallery/research.png",
    takeaway:
      "Platforms reaching smaller cities succeed by adapting to local institutions, not by copying the metro model.",
    keyIdeas: [
      {
        title: "Informal institutions",
        text: "Driver unions and route-sharing norms shape whether a platform is accepted in a city at all.",
      },
      {
        title: "Labour incentives",
        text: "The incentives a platform offers drivers decide whether it can hold on to them.",
      },
      {
        title: "State regulation",
        text: "Rules for aggregators differ from state to state, and each set changes the ground a platform stands on.",
      },
      {
        title: "Trust and fairness",
        text: "Local perceptions of trust and fairness influence adoption alongside price and convenience.",
      },
    ],
  },
];

// ───────────── Logic essays ─────────────

export interface Essay {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
}

export const essays: Essay[] = [];

// ───────────── Press ─────────────

export type PressCategory =
  | "Earned editorial"
  | "Interview"
  | "Podcast"
  | "Speaking appearance"
  | "Sponsored/partner content"
  | "Press release"
  | "Classification pending";

export interface PressItem {
  title: string;
  outlet: string;
  url: string;
  category: PressCategory;
  date: string;
}

export const pressItems: PressItem[] = [
  {
    title: "Manan Singla: Where Entrepreneurship Meets Social Impact",
    outlet: "Mid-day",
    url: "https://www.mid-day.com/buzzfeed/article/manan-singla-where-entrepreneurship-meets-social-impact-11040",
    category: "Sponsored/partner content", // move once confirmed as earned vs sponsored
    date: "30 September 2026",
  },
];

// ───────────── Bios (media kit, third person on purpose) ─────────────

export const bios = {
  short:
    "Manan Singla is an entrepreneur and author based in Mumbai and the San Francisco Bay Area. He is the founder of ECTO INDIA, an auto-rickshaw mobility platform on trial in 11 cities across Uttar Pradesh, Haryana and Punjab, and the author of Meet Me in the Backyard, a work of philosophical reflection on identity and fear.",
  medium:
    "Manan Singla is an entrepreneur and author based in Mumbai and the San Francisco Bay Area, whose work spans urban mobility, municipal services, diamonds and international trade, and philosophical writing. He is the founder of ECTO INDIA, which is developing an auto-rickshaw mobility platform for Tier 2 and Tier 3 cities, with trial operations across 11 cities in Uttar Pradesh, Haryana and Punjab. Through S.S. Solutions, established in 2025, he undertakes municipal and tender-based service work, including mechanised road sweeping in Kurukshetra, Haryana. He also works in diamonds and international trade, with training at HRD Antwerp. His book, Meet Me in the Backyard, published in July 2026, is a work of philosophical reflection on identity, fear and the private life of the mind.",
  long:
    "Manan Singla is an entrepreneur and author based in Mumbai and the San Francisco Bay Area, whose work spans urban mobility, municipal services, diamonds and international trade, and philosophical writing.\n\nHe is the founder of ECTO INDIA, active since February 2024 and co-founded with Vansh Gehlot. ECTO INDIA is developing an auto-rickshaw mobility platform for Tier 2 and Tier 3 Indian cities, built around local trust and driver-first economics, with trial operations across 11 cities in Uttar Pradesh, Haryana and Punjab.\n\nThrough S.S. Solutions, established in April 2025, he undertakes municipal and tender-based service work, including mechanised road sweeping in Kurukshetra, Haryana. He also works in diamonds and international trade, from Mumbai and Surat to New York, with training at HRD Antwerp, Belgium.\n\nAlongside this work, he writes. His book, Meet Me in the Backyard, published as a Kindle edition in July 2026, is a work of philosophical reflection on identity, fear and the private life of the mind. His research manuscript, Platformisation in Smaller Indian Cities, deposited on Zenodo in September 2026, examines how informal institutions, labour and trust shape the adoption of mobility platforms beyond India's metros.\n\nHe keeps a limited presence online and prefers longer work, direct conversations and time away from the feed.",
};


export const researchEndorsement = {
  label: "Letter of endorsement",
  date: "October 2026",
  name: "Angela M. Counts",
  role: "Former Director of Admissions, Harvard Divinity School",
  institution: "Harvard University",
  quote:
    "Manan’s work offers a nuanced perspective on the relationship between technological innovation and the realities of everyday urban life.",
  secondQuote:
    "I am pleased to endorse his research and recommend him for academic opportunities that value independent thinking, interdisciplinary inquiry, and a thoughtful engagement with contemporary societal challenges.",
  letterUrl: "" as string,
  tone: "#1b2540",
} as const;