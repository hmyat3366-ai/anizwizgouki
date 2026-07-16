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
  {
    number: "03",
    dateRange: "July 2026 — Ongoing Project",
    title: "Freelance UI/UX & Frontend Developer",
    badge: "Client Work",
    description:
      "Successfully delivered an end-to-end UI/UX redesign and frontend implementation for Xia Chat, a SaaS customer support platform. Managed the entire project lifecycle—from client onboarding and requirement gathering on July 5 to rapid prototyping and production-ready development within a tight 3-day sprint. Ensured a premium, modern aesthetic using React and Tailwind CSS.",
    footerLabel: "Project Completed",
    projectLogos: [
      { src: asset("xiachat-logo.png"), alt: "Xia Chat" },
    ],
  },
];
