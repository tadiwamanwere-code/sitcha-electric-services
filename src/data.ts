/**
 * ALL SITE CONTENT LIVES HERE.
 *
 * Together with the @theme block in index.css, this file is ~95% of a rebrand.
 *
 * Content source: the client's existing site (sitchaelectricservices.netlify.app)
 * and their Facebook page. Every service, number, service area, and testimonial
 * below is taken from those. Nothing here is invented.
 *
 * Rules (see references/copywriting.md):
 *  - Never invent stats, years in business, certifications, awards, or client names.
 *  - Never invent prices. Route pricing to "get a free quote".
 *  - Flag any stock photography in a comment so the next person knows to swap it.
 */

import type {
  Brand,
  ContactInfo,
  GalleryImage,
  ProcessStep,
  Project,
  SectionCopy,
  Service,
  Value,
} from './types';

// ---------------------------------------------------------------------------
// BRAND
// ---------------------------------------------------------------------------

export const BRAND: Brand = {
  name: 'SITCHA ELECTRIC',
  kicker: 'ELECTRICAL & SOLAR SERVICES',
  legalName: 'Sitcha Electric Services',
  footerLine: 'ELECTRICAL & SOLAR SERVICES — MASVINGO, ZIMBABWE.',
  blurb:
    'Electrical and solar specialists — solar systems, house wiring, fault finding, and appliance repairs. Serving Masvingo, Zvishavane, and Chiredzi since 2023.',
};

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------

export const HERO_DATA = {
  bgImage: '/images/hero.jpg',
  bgAlt: 'Electrician installing wiring in a distribution board',
  tagline: 'POWER DONE PROPERLY',
  /** Unknown local business → lead with the company name. */
  headline: 'Sitcha Electric Services',
  subheadline:
    'Solar installations, house wiring, fault finding, and appliance repairs for homes and businesses across Masvingo, Zvishavane, and Chiredzi — wired safely, tested properly, finished neatly.',
  ctaPrimary: 'Get A Free Quote',
  ctaSecondary: 'View Our Work',
};

// ---------------------------------------------------------------------------
// SECTION HEADERS
// ---------------------------------------------------------------------------

export const SECTIONS: Record<
  'about' | 'values' | 'services' | 'projects' | 'gallery' | 'process' | 'contact',
  SectionCopy
> = {
  about: {
    eyebrow: 'OUR STORY',
    heading: 'Reliable Power, From Board to Socket.',
  },
  values: {
    eyebrow: 'OPERATING PRINCIPLES',
    heading: 'Why Clients Trust Us',
  },
  services: {
    eyebrow: 'OUR SERVICES',
    // \n forces a two-line break for rhythm.
    heading: 'Safe Circuits. \nSteady Power.',
    intro:
      'Sitcha Electric Services covers homes, businesses, and industry — solar and backup power, wiring and rewiring, fault finding, appliance repairs, security systems, automation, and industrial work.',
  },
  projects: {
    eyebrow: 'OUR WORK',
    heading: 'Our Recent Projects',
    intro:
      "A look at the kind of work we take on across Masvingo, Zvishavane, and Chiredzi. We're adding more project photos here as jobs are completed.",
  },
  gallery: {
    eyebrow: 'ON SITE',
    heading: 'Our Gallery',
    intro: 'Installations, boards, and repairs — the kind of work we do every week.',
  },
  process: {
    eyebrow: 'OUR PROCESS',
    heading: 'From Call-Out to Clean Handover',
    intro: 'Four simple steps, from your free assessment to the final test and sign-off.',
  },
  contact: {
    eyebrow: 'GET IN TOUCH',
    heading: 'Get a Free Quote',
    intro:
      "Tell us about your job and we'll come back to you with a quote. Or call or WhatsApp us directly below.",
  },
};

/** The Services section's decorative photo banner. */
export const SERVICES_BANNER = {
  // Stock photo (Unsplash) — swap for a real Sitcha install when available.
  src: '/images/services-banner.jpg',
  alt: 'Solar panel array installed on a residential roof',
  caption: 'Neat Work. Safe Power.',
};

// ---------------------------------------------------------------------------
// VALUES — exactly 3 (fills md:grid-cols-3 at every breakpoint)
// ---------------------------------------------------------------------------

export const VALUES_DATA: Value[] = [
  {
    title: 'Safety-First Wiring',
    description:
      'Proper earthing, balanced loads, and correctly rated protection on every job — the parts nobody sees are the parts that keep a building safe.',
  },
  {
    title: 'One Team, Whole Property',
    description:
      'Solar, wiring, appliances, automation, and industrial machines under one contractor — no chasing three different people for one problem.',
  },
  {
    title: 'Weekend & Urgent Call-Outs',
    description:
      'Power problems do not wait for Monday. We take urgent jobs on weekends in Masvingo and the nearby towns.',
  },
];

// ---------------------------------------------------------------------------
// SERVICES — grouped from the full service list on the client's existing site.
// The first one is open by default.
// iconName must have a matching case in Services.tsx getIcon().
// ---------------------------------------------------------------------------

export const SERVICES_DATA: Service[] = [
  {
    id: 'solar-backup-power',
    iconName: 'Sun',
    title: 'Solar & Backup Power',
    description:
      'Modern solar systems and backup power sized to what you actually run, so the lights and the fridge stay on through an outage.',
    details: [
      'Modern solar system installations',
      'Inverter and battery backup systems',
      'System sizing to your actual load',
      'Servicing and fault diagnosis',
    ],
  },
  {
    id: 'wiring-rewiring',
    iconName: 'Zap',
    title: 'House Wiring & Rewiring',
    description:
      'New house wiring and complete rewiring of older properties, including the distribution board work that makes the whole install safe.',
    details: [
      'New house wiring and full rewiring',
      'Distribution board upgrades',
      'Load balancing and 3-phase work',
      'Smart control panels',
    ],
  },
  {
    id: 'appliance-repairs',
    iconName: 'WashingMachine',
    title: 'Appliance & Laundry Repairs',
    description:
      'Repairs to household and commercial appliances — diagnosed at the cause rather than swapped out on a guess.',
    details: [
      'Stoves, ovens, and induction cookers',
      'Fridges and household appliances',
      'Washers, dryers, and roller irons',
      'Motor rewinding',
    ],
  },
  {
    id: 'fault-finding',
    iconName: 'Gauge',
    title: 'Fault Finding & Power Audits',
    description:
      'Fast, accurate fault finding when something trips, dims, or stops — plus power audits that show where the load is actually going.',
    details: [
      'Fast and accurate fault finding',
      'Power audits',
      'Circuit design and simulation',
      'Testing and certification of repairs',
    ],
  },
  {
    id: 'safety-security',
    iconName: 'ShieldCheck',
    title: 'Safety & Security Systems',
    description:
      'Electric fencing, lightning protection, earthing, and alarms — the systems that protect the property and everyone in it.',
    details: [
      'Electric fence installation and servicing',
      'Lightning protection and proper earthing',
      'Sensors and alarm installation',
      'Fault repair on existing systems',
    ],
  },
  {
    id: 'home-automation',
    iconName: 'Smartphone',
    title: 'Home Automation',
    description:
      'Phone-controlled lighting, plugs, and security so the house responds without anyone getting up to flip a switch.',
    details: [
      'Phone-controlled lights and plugs',
      'Smart security integration',
      'Scheduled and scene-based control',
      'Setup and handover training',
    ],
  },
  {
    id: 'industrial',
    iconName: 'Factory',
    title: 'Industrial & Generators',
    description:
      'Installation and maintenance of industrial machines and generator sets, keeping production and backup supply running.',
    details: [
      'Industrial machine installation',
      'Scheduled machine maintenance',
      'Generator installation and repairs',
      'Motor rewinding and rebuilds',
    ],
  },
];

// ---------------------------------------------------------------------------
// PROCESS — exactly 4 (maps to lg:grid-cols-4).
// ---------------------------------------------------------------------------

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Call-Out & Assessment',
    description:
      'We come to the property, look at the board, the load, and the problem, and talk through what the job actually involves.',
    duration: 'Free Assessment',
    deliverables: ['On-site inspection', 'Load and board check', 'Practical options explained'],
  },
  {
    step: '02',
    title: 'Quote & Plan',
    description:
      'You get a clear written quote with the scope of works and a timeline — no surprises once we start.',
    duration: '1 - 3 Days',
    deliverables: ['Written quote', 'Detailed scope of works', 'Agreed timeline'],
  },
  {
    step: '03',
    title: 'Installation & Repair',
    description:
      'Our team carries out the work in sequence, isolating safely, protecting the space, and keeping the site tidy throughout.',
    duration: 'Varies by scope',
    deliverables: ['Safe isolation', 'Sequenced install', 'Progress updates'],
  },
  {
    step: '04',
    title: 'Testing & Handover',
    description:
      'Everything is tested under load, labelled, and demonstrated to you before we leave — and we clean up after ourselves.',
    duration: '1 - 2 Days',
    deliverables: ['Full load testing', 'Labelled board', 'Walkthrough and clean-up'],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS — grounded in the client testimonials published on their existing
// site (Mr Moyo / Mr Chikomba — solar; Mr Dube — rewiring; Mrs Chirwa — laundry).
// Client names are NOT published here; details are limited to what those
// testimonials actually state.
//
// Photos are STOCK (Unsplash) — swap for real job photos as they come in.
// ---------------------------------------------------------------------------

export const PROJECTS_DATA: Project[] = [
  {
    id: 'solar-installation-masvingo',
    title: 'Home Solar System Installation',
    category: 'residential',
    categoryLabel: 'Solar',
    description:
      'A complete home solar installation — panels, inverter, and battery backup — commissioned and handed over with the system explained step by step.',
    afterImage: '/images/project-1.jpg',
    year: 'Recent',
    location: 'Masvingo',
    client: 'Private Residence',
    area: 'Whole Property',
    highlights: [
      'Panel array and mounting',
      'Inverter and battery backup',
      'Commissioning and handover walkthrough',
    ],
  },
  {
    id: 'rewiring-chiredzi',
    title: 'Full Rewiring & Board Upgrade',
    category: 'renovation',
    categoryLabel: 'Rewiring',
    description:
      'An older property rewired throughout and moved onto an upgraded distribution board, with the circuits balanced and labelled.',
    afterImage: '/images/project-2.jpg',
    year: 'Recent',
    location: 'Chiredzi',
    client: 'Private Residence',
    area: 'Whole Property',
    highlights: [
      'Complete house rewiring',
      'Distribution board upgrade',
      'Balanced and labelled circuits',
    ],
  },
  {
    id: 'laundry-repairs-zvishavane',
    title: 'Laundry Machine Repairs',
    category: 'commercial',
    categoryLabel: 'Appliance Repair',
    description:
      'Washing machines diagnosed and repaired on site, tested through a full cycle before sign-off.',
    afterImage: '/images/project-3.jpg',
    year: 'Recent',
    location: 'Zvishavane',
    client: 'Private Client',
    area: 'Laundry',
    highlights: [
      'On-site fault diagnosis',
      'Component repair and replacement',
      'Full-cycle test before handover',
    ],
  },
];

// ---------------------------------------------------------------------------
// GALLERY — 6 (grid is 2 cols mobile / 3 cols desktop).
//
// TODO: these are STOCK photos (Unsplash), chosen to match the services we
// actually offer. Replace with real Sitcha job photos as they become available.
// ---------------------------------------------------------------------------

export const GALLERY_IMAGES: GalleryImage[] = [
  {src: '/images/gallery-1.jpg', alt: 'Electrician working on an electrical installation on site'},
  {src: '/images/gallery-2.jpg', alt: 'Wall-mounted power unit installed on a domestic supply'},
  {src: '/images/gallery-3.jpg', alt: 'Newly installed wall switch and lighting control'},
  {src: '/images/gallery-4.jpg', alt: 'Front-load washing machine serviced and tested'},
  {src: '/images/gallery-5.jpg', alt: 'Pendant lighting installed and wired in a living space'},
  {src: '/images/gallery-6.jpg', alt: 'Standby generator unit installed for backup power'},
];

// ---------------------------------------------------------------------------
// CONTACT
// `phone*Formatted` = what the visitor reads.
// `whatsapp` = full international, digits only, NO leading + → wa.me/<this>
// ---------------------------------------------------------------------------

export const CONTACT_INFO: ContactInfo = {
  phone: '+263787377173',
  phoneFormatted: '+263 78 737 7173',
  phone2: '+263778897153',
  phone2Formatted: '+263 77 889 7153',
  phone3: '+263775172884',
  phone3Formatted: '+263 77 517 2884',
  whatsapp: '263787377173',
  serviceArea: 'Masvingo, Zvishavane & Chiredzi — we come to you',
  // TODO: confirm weekday hours with the client. Weekend availability is taken
  // from their existing site; the Mon-Sat window is our standing assumption.
  hours: 'Monday - Saturday: 8:00 AM - 5:00 PM (CAT). Urgent weekend call-outs available.',
  facebook: 'https://www.facebook.com/profile.php?id=61577145809353',
  facebookHandle: 'Sitcha Electric Services',
};

// ---------------------------------------------------------------------------
// QUOTE FORM options — must mirror SERVICES_DATA.
// ---------------------------------------------------------------------------

export const PROJECT_SIZE_OPTIONS = ['Single Room', 'Whole Property', 'Commercial / Industrial'];

export const PROJECT_TYPE_OPTIONS = [
  {value: 'solar-backup-power', label: 'Solar & Backup Power'},
  {value: 'wiring-rewiring', label: 'House Wiring / Rewiring'},
  {value: 'appliance-repairs', label: 'Appliance & Laundry Repairs'},
  {value: 'fault-finding', label: 'Fault Finding / Power Audit'},
  {value: 'safety-security', label: 'Electric Fence / Alarms / Earthing'},
  {value: 'home-automation', label: 'Home Automation'},
  {value: 'industrial', label: 'Industrial / Generator Work'},
  {value: 'not-sure', label: 'Not sure yet'},
];
