import type { ExperienceEntry } from "../types";
import { asset } from "../lib/asset";

/** Experience bento-box entries. */
export const EXPERIENCES: ExperienceEntry[] = [
  {
    number: "01",
    dateRange: "Dec 2025 — Mar 2026",
    title: "UI/UX Internship",
    badge: "Bootcamp Team",
    description:
      "Managed the complete design process by planning with the team, creating wireframes, designing the UI in Figma, testing prototypes, handing over files to developers, and reviewing the final website with the founder.",
    footerLabel: "Projects Designed",
    projectLogos: [
      { src: asset("lg1.png"), alt: "Aura Real Estate" },
      { src: asset("Gemini_Generated_Image_.jpg"), alt: "Skyline Agency" },
      { src: asset("DMAR.png"), alt: "DMAR App" },
    ],
  },
  {
    number: "02",
    dateRange: "Jan 2026 — Present",
    title: "AI-Assisted Dev",
    badge: "Independent",
    description:
      'Took ownership of the "Design to Code" process by leveraging AI-assisted development tools and modern workflows. Independently translated high-fidelity Figma designs into fully functional, responsive, and pixel-perfect frontend code, bridging the gap between design and development.',
    footerLabel: "Projects Coded",
    projectLogos: [
      { src: asset("lg1.png"), alt: "Aura Real Estate" },
      { src: asset("Gemini_Generated_Image_.jpg"), alt: "Skyline Agency" },
      { src: asset("DMAR.png"), alt: "DMAR App" },
    ],
  },
];
