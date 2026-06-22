/** Shared TypeScript interfaces for the portfolio application. */

/** A step in a design or development process timeline. */
export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

/** Full case study data for the modal and cards. */
export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  year: string;
  timeline: string;
  tools: string[];
  bgColor: string;
  roles: string[];
  desc: string;
  overview: string;
  gallery: string[];
  figmaScreenshot: string;
  figmaProcess: ProcessStep[];
  designToCode: ProcessStep[];
  keyMetric: string;
  highlightColor: string;
  image: string;
  url: string;
  figmaLink: string;
  /** Optional AI process screenshot (mutually exclusive with iframeUrl). */
  aiScreenshot?: string;
  /** Optional iframe URL for live site embed (mutually exclusive with aiScreenshot). */
  iframeUrl?: string;
}

/** A tool displayed in the marquee banner. */
export interface ToolItem {
  name: string;
  Icon: React.ComponentType;
}

/** A skill displayed in the accordion with its hover image. */
export interface SkillItem {
  label: string;
  imageUrl: string;
}

/** An experience entry for the bento grid. */
export interface ExperienceEntry {
  number: string;
  dateRange: string;
  title: string;
  badge: string;
  description: string;
  footerLabel: string;
  projectLogos: { src: string; alt: string }[];
}

/** A navigation link in the header. */
export interface NavLink {
  href: string;
  label: string;
  sectionKey: string;
}

/** A social media link in the footer. */
export interface SocialLink {
  href: string;
  label: string;
}

/** An "about" stat displayed in the grid. */
export interface AboutStat {
  value: string;
  label: string;
}
