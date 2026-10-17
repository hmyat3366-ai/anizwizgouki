import type { ExperienceEntry } from "../types";
import { asset } from "../lib/asset";

/**
 * Single featured experience entry representing the comprehensive School Internship.
 * Encompasses the 3 student internship projects: Aura Real Estate, DMAR App, and Skyline Agency.
 */
export const EXPERIENCES: ExperienceEntry[] = [
  {
    number: "01",
    dateRange: "Dec 2025 — Mar 2026",
    title: "UI/UX Design Intern",
    badge: "School Internship",
    institution: "Academic Internship Program",
    description:
      "Completed an intensive academic School Internship program collaborating within a student design team. Gained rigorous hands-on experience driving user-centered design processes—conducting user research, architecting information structures, designing scalable Figma UI systems, testing interactive prototypes, and handing off production assets for 3 distinct client-oriented projects.",
    responsibilities: [
      "User Research & Persona Mapping",
      "Information Architecture & Wireframing",
      "Figma Design Systems & Components",
      "Interactive Micro-Interactions & Prototyping",
      "Developer Handoff & Stakeholder Reviews",
    ],
    keyTakeaway:
      "Delivered 3 end-to-end client-oriented project designs with direct mentor feedback, peer design critiques, and structured design-to-code alignment.",
    footerLabel: "Internship Deliverables",
    projectLogos: [
      { src: asset("lg1.png"), alt: "Aura Real Estate" },
      { src: asset("DMAR.png"), alt: "DMAR App" },
      { src: asset("Gemini_Generated_Image_.jpg"), alt: "Skyline Agency" },
    ],
    projects: [
      {
        id: "aura",
        title: "Aura Real Estate",
        category: "Luxury Real Estate Platform",
        timeline: "4 Weeks",
        role: "Lead UI & Layout Designer",
        description:
          "Designed a luxury property platform with high-end editorial typography, 12-column responsive layout, and a comprehensive Figma component system.",
        logo: asset("lg1.png"),
        tags: ["Figma System", "Wireframing", "Editorial UI"],
      },
      {
        id: "dmar",
        title: "DMAR App",
        category: "Financial Dashboard & Mobile UI",
        timeline: "6 Weeks",
        role: "UX Research & Mobile UI",
        description:
          "Crafted an approachable financial dashboard and mobile experience with custom mascot branding, dynamic analytics widgets, and modular data visualization.",
        logo: asset("DMAR.png"),
        tags: ["Mobile UI", "Design System", "Data Viz"],
      },
      {
        id: "skyline",
        title: "Skyline Agency",
        category: "Brutalist Agency Portfolio",
        timeline: "3 Weeks",
        role: "Visual Identity & Motion",
        description:
          "Pushed creative boundaries with an aggressive brutalist agency showcase, asymmetrical typography, custom poster layouts, and fluid motion design.",
        logo: asset("Gemini_Generated_Image_.jpg"),
        tags: ["Brutalist UI", "Visual Identity", "Prototyping"],
      },
    ],
  },
];
