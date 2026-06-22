import type { NavLink, SocialLink, AboutStat } from "../types";

/** Primary navigation links. */
export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home", sectionKey: "home" },
  { href: "#services-section", label: "Skill", sectionKey: "skill" },
  { href: "#about-section", label: "About", sectionKey: "about" },
  { href: "#project", label: "Project", sectionKey: "project" },
];

/** Social links for the footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/htet-myat-99811a3a3?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/gkiashtetmyat/",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/anzei.gki",
    label: "Facebook",
  },
];

/** Stats grid in the About section. */
export const ABOUT_STATS: AboutStat[] = [
  { value: "3+", label: "Case Studies" },
  { value: "Figma", label: "Core Tool" },
  { value: "1", label: "Internship" },
];

/** Section IDs that the IntersectionObserver tracks for nav highlighting. */
export const OBSERVED_SECTION_IDS = [
  "home",
  "services-section",
  "about-section",
  "project",
] as const;

/**
 * Maps DOM section IDs to the nav "sectionKey" used for active highlighting.
 * Some IDs don't directly match their nav label (e.g. "services-section" → "skill").
 */
export const SECTION_ID_TO_KEY: Record<string, string> = {
  "services-section": "skill",
  "about-section": "about",
};

/** Contact email address. */
export const CONTACT_EMAIL = "hmyat0407@gmail.com";
