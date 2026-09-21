/**
 * Single source of truth for every fact on the CV.
 *
 * The page, the printed PDF, `/llms.txt` and the structured data all render
 * from this module. Nothing here may be retyped in a component or a template —
 * that is what let the two copies of this CV drift apart before.
 *
 * NOTE ON DATES: several entries hold only a status word ("Present",
 * "Ongoing", "Completed", "Former") because no start year has been supplied.
 * Real ranges ("2024 — Present") would read better in a CV that puts dates
 * flush right, where a reader scans them as a column.
 */

export interface Metric {
  value: string;
  label: string;
}

export interface Role {
  id: string;
  title: string;
  org: string;
  orgUrl?: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  metrics?: Metric[];
}

export interface Position {
  title: string;
  org: string;
  note: string;
  period: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Channel {
  name: string;
  role: string;
  platform: string;
  blurb: string;
}

export interface SectionRef {
  id: string;
  label: string;
  clause: string;
  /** Single-key jump, surfaced in the contents block. */
  key: string;
}

export const identity = {
  fullName: "Emeka Emmanuel Ugonna",
  moniker: "Ugo.B",
  headline: "Full-Stack Software Engineer, Founder, and Legal Scholar",
  standing: "LL.B, Second Class Upper, Imo State University, Owerri, Nigeria",
  domain: "emmanuelemeka.cv",
};

export const contact = {
  email: "contactugob@gmail.com",
  x: { label: "x.com/Don_ugob", href: "https://x.com/Don_ugob" },
  product: { label: "votesphere.com.ng", href: "https://votesphere.com.ng" },
};

/** Printed on the CV but deliberately never published to the web page. */
export const printOnly = {
  phone: "08103579586",
  location: "Owerri, Imo State, Nigeria",
};

export const cvPdf = "/cv/Emeka-Emmanuel-Ugonna-CV.pdf";

export const profile =
  "Operating at the rare intersection of modern software engineering and digital jurisprudence. I design and ship high-concurrency digital platforms while mastering tech law, cybercrime analysis, and constitutional governance.";

export const experience: Role[] = [
  {
    id: "votesphere",
    title: "Creator & Core Engineer",
    org: "Votesphere",
    orgUrl: "https://votesphere.com.ng",
    location: "Remote",
    period: "Present",
    summary:
      "Secure, high-concurrency online voting platform for live monetized and non-monetized events and elections.",
    bullets: [
      "Engineered for live concurrent traffic during voting events and elections",
      "Integrated Paystack, Flutterwave, and Monnify payment gateways",
      "Built secure voting verification algorithms and live result streaming",
      "Shipped custom analytics for event operators",
    ],
    metrics: [{ value: "5M+", label: "grossed in the first 30 days" }],
  },
  {
    id: "studio",
    title: "Founder & Principal Engineer",
    org: "Build With Ugo.B",
    orgUrl: "https://build-with-ugob.com.ng",
    location: "Remote",
    period: "Present",
    summary:
      "Digital product studio engineering custom high-performance web applications, modern APIs, and scalable infrastructure.",
    bullets: [
      "Custom web architectures for client products",
      "Performance and optimization audits",
      "High-converting client applications end-to-end",
    ],
  },
  {
    id: "naija",
    title: "Creator & Legal Educator",
    org: "NaijaLawExplained",
    location: "YouTube and social",
    period: "Ongoing",
    summary:
      "Legal enlightenment brand simplifying complex Nigerian statutes into digestible visual guides and video content.",
    bullets: [
      "Statutory law broken down for everyday citizens",
      "Visual guides and multi-platform distribution",
    ],
  },
  {
    id: "street",
    title: "Host",
    org: "Street Saga Podcast",
    location: "X Spaces",
    period: "Ongoing",
    summary:
      "Live interactive broadcasts on tech engineering, career growth, law, and social dynamics.",
    bullets: [
      "High-engagement live community conversations",
      "Rights advocacy and technical culture",
    ],
  },
];

export const education = {
  degree: "Bachelor of Laws (LL.B)",
  distinction: "Second Class Upper",
  institution: "Imo State University (IMSU)",
  period: "Graduated 2026",
};

export const research = {
  title:
    "The Challenges of Prosecuting Cybercrime Under the Nigerian Cybercrimes Act 2015: An Analysis",
  body: "Mapping the gap between digital offending and courtroom reality — evidence, jurisdiction, procedure, and institutional capacity under Nigeria's primary cybercrime statute.",
  competencies: [
    "Land Law",
    "Evidence Law",
    "Digital Tech Law",
    "Equity Contracts",
    "Cybercrime Frameworks",
    "Constitutional Law",
  ],
  related: [
    "Retributive Jurisprudence",
    "Equity Agreements for Tech Founders and Designers",
  ],
};

export const leadership: Position[] = [
  {
    title: "Campus Director",
    org: "Law Students' Association of Nigeria (LAWSAN)",
    note: "Award of Honor Recipient",
    period: "Former",
  },
  {
    title: "State Director",
    org: "Directorate of Students' Rights",
    note: "Student rights advocacy and leadership",
    period: "Former",
  },
  {
    title: "Chairman, Constitution Drafting Committee",
    org: "Omenwanne Age Grade",
    note: "Drafted the constitution adopted by the Age Grade for community governance",
    period: "Completed",
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "Astro", "React", "Tailwind CSS", "TypeScript", "HTML5 / CSS3"],
  },
  {
    title: "Backend and data",
    items: ["Node.js", "Express", "Prisma ORM", "PostgreSQL", "Supabase", "REST and GraphQL"],
  },
  {
    title: "Infrastructure",
    items: ["Fedora Linux", "Coolify", "Hetzner", "Vercel", "ImageKit", "Open-weight AI"],
  },
  {
    title: "Creative and legal",
    items: [
      "Blender",
      "Figma",
      "UI/UX",
      "Cybercrime law",
      "Equity contracts",
      "Constitutional drafting",
    ],
  },
];

export const media: Channel[] = [
  {
    name: "Street Saga Podcast",
    role: "Host",
    platform: "X Spaces",
    blurb: "Live spaces on tech careers, rights advocacy, engineering craft, and culture.",
  },
  {
    name: "NaijaLawExplained",
    role: "Founder",
    platform: "YouTube and social",
    blurb: "Statutory law demystified — visual guides for everyday Nigerians.",
  },
];

export const availability = [
  "High-concurrency web platforms and SaaS",
  "Custom agency builds and audits",
  "Tech equity and founder contracts, advisory",
  "Speaking, Spaces, legal-tech education",
];

export const sections: SectionRef[] = [
  { id: "profile", label: "Profile", clause: "1.", key: "1" },
  { id: "experience", label: "Experience", clause: "2.", key: "2" },
  // Kept short: these labels are the heading on both the page and the printed
  // CV, and a CV heading reads better as one word.
  { id: "education", label: "Education", clause: "3.", key: "3" },
  { id: "leadership", label: "Leadership", clause: "4.", key: "4" },
  { id: "skills", label: "Skills", clause: "5.", key: "5" },
  { id: "media", label: "Media", clause: "6.", key: "6" },
  { id: "contact", label: "Contact", clause: "7.", key: "7" },
];
