export interface Brand {
  /** Rendered as typed in nav + footer. Keep uppercase. */
  name: string;
  /** Small mono micro-label under the name. 2-4 words naming the actual trade. */
  kicker: string;
  /** Footer copyright line. */
  legalName: string;
  /** Footer sub-line: trade + location. */
  footerLine: string;
  /** 1-2 sentences under the logo in the footer. */
  blurb: string;
}

export interface SectionCopy {
  /** Mono uppercase eyebrow, e.g. "OUR SERVICES". */
  eyebrow: string;
  /** h2. A \n is honoured where the component splits on it. */
  heading: string;
  /** Optional 1-2 sentence lead. Never three. */
  intro?: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface Service {
  /** kebab-case. Used for DOM ids and to pick the default-open panel. */
  id: string;
  /** lucide-react icon name. Must have a case in Services.tsx getIcon(). */
  iconName: string;
  title: string;
  description: string;
  /** 3-5 inclusions (not adjectives). 4 renders as a clean 2x2. */
  details: string[];
}

export interface ProcessStep {
  /** Zero-padded, e.g. "01". */
  step: string;
  title: string;
  description: string;
  /** Honest even when vague: "Varies by room size". */
  duration: string;
  /** 3 tangible outputs. */
  deliverables: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'design-build' | 'renovation';
  /** Human-facing badge text, e.g. "Full Renovation". */
  categoryLabel: string;
  description: string;
  /** Optional — present for a future before/after treatment. */
  beforeImage?: string;
  afterImage: string;
  /** "2024", or "Recent" if unknown. Never invent one. */
  year: string;
  location: string;
  /** "Private Residence" when the name cannot be published. */
  client: string;
  /** Room or size — whichever you actually have. */
  area: string;
  /** Omit unless the client has cleared publishing it. */
  budget?: string;
  /** 3 bullets for the modal's DETAILS list. */
  highlights: string[];
}

export interface GalleryImage {
  src: string;
  /** Descriptive — carries both accessibility and image SEO. */
  alt: string;
}

export interface ContactInfo {
  /** DIGITS ONLY — goes straight into href="tel:". Spaces break some dialers. */
  phone: string;
  /** What the visitor reads, e.g. "+263 77 358 3427". */
  phoneFormatted: string;
  phone2?: string;
  phone2Formatted?: string;
  phone3?: string;
  phone3Formatted?: string;
  /** Full international, digits only, no leading + → wa.me/<this> */
  whatsapp: string;
  email?: string;
  serviceArea: string;
  /** Include the timezone. */
  hours: string;
  facebook?: string;
  facebookHandle?: string;
  instagram?: string;
  instagramHandle?: string;
}
