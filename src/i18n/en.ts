/** English UI texts. The Arabic file (ar.ts) must have the same keys. */
const en = {
  meta: {
    title: 'Adly Ehab — Web & AI Automation Developer',
    description:
      'Adly Ehab builds websites, online stores and web systems, and connects them to AI and automation. Based in Cairo, Egypt, open to remote work.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
    switchLanguage: 'التبديل إلى العربية',
    mainNav: 'Main',
    home: 'back to top',
    close: 'Close',
    opensInNewTab: '(opens in a new tab)',
  },
  nav: {
    projects: 'Projects',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    langShort: 'عربي',
    langLabel: 'العربية',
  },
  hero: {
    greeting: "Hi, I'm",
    name: 'Adly Ehab',
    title: 'Web & AI Automation Developer',
    intro:
      "I build websites, online stores and web systems, and connect them to AI and automation. I've shipped real products for clients and businesses, including a CRM that handles 500+ leads a day.",
    viewWork: 'View my work',
    contact: 'Contact me',
    availability: 'Available for full-time, remote and freelance work',
    location: 'Cairo, Egypt · open to remote work',
    highlights: [
      { label: 'Client project', title: 'Kero Tours', text: '30+ trips, one-tap WhatsApp booking' },
      { label: 'CRM', title: 'Volume 4T', text: '500+ leads a day, LLM assistant for the CEO' },
      { label: 'Arabic-first', title: 'LEADORA', text: 'Seven-stage sales pipeline, RTL UI' },
    ],
  },
  projects: {
    eyebrow: 'Selected work',
    title: 'Featured projects',
    lead: 'Real products for clients and businesses — from booking websites to CRMs, bots and AI tools. Tap a project for the full details.',
    liveSite: 'Live site',
    details: 'Details',
    viewDetails: 'View details for',
    moreShow: 'More projects',
    moreHide: 'Show fewer projects',
    highlights: 'Highlights',
    techStack: 'Tech stack',
    desktopShot: 'desktop screenshot',
    mobileShot: 'mobile screenshot',
    noLink: 'Private / internal project — no public link',
  },
  services: {
    eyebrow: 'Services',
    title: 'What I can build for you',
    lead: 'From your first website to the systems that run your business day to day.',
    items: [
      {
        title: 'Websites & Online Stores',
        text: 'Fast, mobile-friendly websites and online stores that are easy to use — with booking or ordering straight to WhatsApp when that suits your customers.',
        example: 'e.g. Kero Tours',
      },
      {
        title: 'CRM & Business Systems',
        text: 'Custom CRMs and internal systems: sales pipelines, lead tracking, attendance, payroll, commission and role-based dashboards.',
        example: 'e.g. LEADORA, Volume 4T',
      },
      {
        title: 'Bots & Automation',
        text: 'Telegram bots and workflow automation that take repetitive work off your team — registrations, approvals and content delivery.',
        example: 'e.g. PilotVBot',
      },
      {
        title: 'AI Integration',
        text: 'Connect LLMs and AI agents to your website or system — assistants that answer questions about your own data in plain language.',
        example: 'e.g. Volume 4T CEO assistant',
      },
    ],
  },
  about: {
    eyebrow: 'About',
    title: 'Websites and systems, connected to AI',
    paragraphs: [
      "I'm Adly Ehab, a web & AI automation developer based in Cairo, Egypt, and open to remote work.",
      "I build websites, online stores and web systems, and connect them to AI and automation. I've shipped real products for clients and businesses, including a CRM that handles 500+ leads a day. Several of my products are Arabic-first, with full right-to-left support.",
    ],
    skillsTitle: 'Skills',
    groups: [
      {
        title: 'Front-end',
        items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Responsive design'],
      },
      {
        title: 'Web & E-commerce',
        items: ['PHP', 'MySQL', 'WordPress / stores', 'REST APIs'],
      },
      {
        title: 'AI & Automation',
        items: ['LLM APIs (Claude, Llama)', 'AI agents', 'Telegram bots', 'Workflow automation'],
      },
      {
        title: 'Tools',
        items: [
          'Git',
          'GitHub',
          'Docker',
          'Hostinger deployment',
          'AI-assisted development (Claude Code)',
        ],
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something together",
    lead: 'Need a website, an online store, a CRM, a bot or AI automation? Or hiring for a front-end, web or AI automation role? Message me — WhatsApp is the fastest.',
    whatsapp: 'Chat on WhatsApp',
    email: 'Email',
    copy: 'Copy email',
    copied: 'Copied!',
    copyFailed: 'Could not copy — please select the address',
    linkedin: 'LinkedIn',
    linkedinText: 'Connect with me',
    github: 'GitHub',
    githubText: 'See my code',
    cv: 'Download CV',
    cvText: 'PDF résumé',
    location: 'Cairo, Egypt · open to remote work',
  },
  footer: {
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
};

export default en;
export type Dictionary = typeof en;
