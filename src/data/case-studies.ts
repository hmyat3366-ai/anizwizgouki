import type { CaseStudy } from "../types";
import { asset } from "../lib/asset";

/**
 * All case study data keyed by slug.
 * Single source of truth — consumed by both CaseStudyCard and CaseStudyModal.
 */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  aura: {
    id: "aura",
    title: "Aura Real Estate",
    tag: "Real Estate",
    year: "2025 DEC",
    timeline: "4 Weeks",
    tools: ["React", "Tailwind", "Figma", "Antigravity AI"],
    bgColor: "bg-[#EAEAEA]",
    roles: ["User Research", "Wireframing", "AI-Assisted Frontend"],
    desc: "A pixel-perfect luxury real estate platform featuring high-end typography, smooth micro-interactions, and a premium user experience.",
    overview:
      "This was my first end-to-end project where I handled everything from initial user research to a fully coded, deployed product. I wanted to challenge myself by building a luxury real estate platform that prioritized visual storytelling and seamless browsing — pushing my skills in layout design, typography hierarchy, and translating high-fidelity Figma mockups into production-ready React code.",
    gallery: [
      "https://via.placeholder.com/1200x800/f3f4f6/a8a29e?text=Aura+Dashboard+View",
      "https://via.placeholder.com/800x1200/f3f4f6/a8a29e?text=Mobile+Property+Details",
      "https://via.placeholder.com/1200x600/f3f4f6/a8a29e?text=Typography+%26+Components",
    ],
    figmaScreenshot: asset("aura-figma.png"),
    figmaProcess: [
      { step: "01", title: "Ideation & Low-Fidelity", desc: "Collaborated with the team to brainstorm core user flows, followed by rapid low-fidelity wireframing to establish the 12-column structural grid." },
      { step: "02", title: "High-Fidelity Design", desc: "Applied a monochromatic palette and editorial typography (mix of serif and sans-serif) to evoke luxury." },
      { step: "03", title: "Prototyping", desc: "Built interactive components to test smooth transitions between the gallery and property details." },
    ],
    designToCode: [
      { step: "01", title: "Component Structure", desc: "Translated Figma layers into reusable React components, maintaining strict pixel parity." },
      { step: "02", title: "Styling with Tailwind", desc: "Mapped Figma spacing tokens directly into Tailwind CSS for consistent layouts." },
      { step: "03", title: "GSAP Interactions", desc: "Engineered staggered entry animations and scroll-triggered parallax effects to mimic the prototype." },
    ],
    keyMetric: "Learned to bridge the full design-to-code pipeline — from Figma wireframes to a deployed React app with scroll-driven animations.",
    highlightColor: "bg-[#00FF66] text-black",
    image: asset("Auraimage.jpg"),
    aiScreenshot: asset("aura-ai-process.png"),
    url: "https://aurarealestate.vercel.app/",
    figmaLink: "https://www.figma.com/design/gBHrwJxQIJzzFy1iCgE4PI/real-estate?node-id=0-1&p=f&t=BQVu8MNRAkkaHTwG-0",
  },
  dmar: {
    id: "dmar",
    title: "DMAR App",
    tag: "Community Platform",
    year: "2026 APRIL",
    timeline: "6 Weeks",
    tools: ["React", "Chart.js", "Tailwind", "Antigravity AI"],
    bgColor: "bg-[#1E1E1E]",
    roles: ["Data Visualization", "Design System", "AI-Accelerated Dev"],
    desc: "A vibrant and intuitive financial dashboard featuring custom mascot branding, complex data visualization, and a highly responsive layout.",
    overview:
      "I took on this project to learn how to handle complex data-heavy interfaces. The main challenge was presenting large volumes of financial data in a way that felt approachable rather than overwhelming. I designed a custom component library, created the mascot branding from scratch, and used AI tools to accelerate the frontend development — learning a ton about chart integration and responsive dashboard layouts along the way.",
    gallery: [
      "https://via.placeholder.com/1400x900/f3f4f6/a8a29e?text=Main+Analytics+Dashboard",
      "https://via.placeholder.com/800x1000/f3f4f6/a8a29e?text=Mobile+Wallet+View",
      "https://via.placeholder.com/1000x800/f3f4f6/a8a29e?text=Custom+Chart+Components",
    ],
    figmaScreenshot: asset("dmar-figma-process.png"),
    aiScreenshot: asset("dmar-live-preview.webp"),
    figmaProcess: [
      { step: "01", title: "Strategy & Low-Fidelity", desc: "Brainstormed data organization strategies with stakeholders, creating low-fidelity wireframes to map out complex dashboard widgets." },
      { step: "02", title: "High-Fidelity Design", desc: "Created a robust component library tailored for dynamic charting, applying a neon-accented dark mode." },
      { step: "03", title: "Branding", desc: "Integrated a custom mascot and refined hover states to make the financial data feel approachable." },
    ],
    designToCode: [
      { step: "01", title: "State Management", desc: "Utilized complex React state to handle dynamic data filtering across multiple widgets." },
      { step: "02", title: "Chart Integration", desc: "Used AI to rapidly configure Chart.js to perfectly match the custom Figma designs." },
      { step: "03", title: "Responsive Grid", desc: "Implemented CSS Grid to ensure the dashboard fluidity adapts from desktop to mobile screens." },
    ],
    keyMetric: "Built my first complete design system and learned to integrate complex Chart.js visualizations with custom Figma components.",
    highlightColor: "bg-[#A742FF] text-white",
    image: asset("DMAR.png"),
    url: "https://dmars.vercel.app/",
    figmaLink: "https://www.figma.com/design/yVENJJHh1wcJb0jq5xVu1F/DMAR-web-view-and-Mobile-view?node-id=4102-259&p=f&t=BQVu8MNRAkkaHTwG-0",
  },
  skyline: {
    id: "skyline",
    title: "Skyline Agency",
    tag: "Agency",
    year: "2026 MAY",
    timeline: "3 Weeks",
    tools: ["React", "GSAP", "Tailwind", "Antigravity AI"],
    bgColor: "bg-[#FFCC00]",
    roles: ["Visual Identity", "Micro-Interactions", "Rapid AI Prototyping"],
    desc: "A bold, brutalist portfolio for a digital agency, pushing boundaries with dynamic typography, neon accents, and custom preloaders.",
    overview:
      "This project was my playground for experimenting with bold, unconventional design. I wanted to push the limits of what a portfolio site could feel like — breaking grid conventions, using oversized brutalist typography, and engineering complex scroll-driven animations. It taught me how to balance visual impact with performance, and how to use AI prototyping tools to iterate on interaction design rapidly.",
    gallery: [
      "https://via.placeholder.com/1200x900/f3f4f6/a8a29e?text=Interactive+Hero+Poster",
      "https://via.placeholder.com/900x1200/f3f4f6/a8a29e?text=Hover+State+Exploration",
      "https://via.placeholder.com/1400x700/f3f4f6/a8a29e?text=Brutalist+Typography+Grid",
    ],
    figmaScreenshot: asset("skyline-figma-process.png"),
    iframeUrl: "https://skylineagc.vercel.app/",
    figmaProcess: [
      { step: "01", title: "Concept & Low-Fidelity", desc: "Team ideation sessions focused on breaking traditional web layouts, sketching out aggressive low-fidelity concepts for the interactive poster experience." },
      { step: "02", title: "High-Fidelity Design", desc: "Designed asymmetrical layouts in Figma using oversized typography and high-contrast brutalist color pairings." },
      { step: "03", title: "Interaction Design", desc: "Prototyped complex scroll behaviors and massive hover states to finalize the agency's bold narrative." },
    ],
    designToCode: [
      { step: "01", title: "Advanced DOM Manipulation", desc: "Utilized GSAP ScrollTrigger to pin sections, scale text, and drive the overall narrative." },
      { step: "02", title: "Infinite Marquee", desc: "Leveraged AI to write the complex math required for a seamless, perfectly looping infinite text marquee." },
      { step: "03", title: "Performance Tuning", desc: "Applied strict 'will-change' CSS rules to ensure heavy animations remained smooth on mobile." },
    ],
    keyMetric: "Pushed my creative boundaries with brutalist design and mastered GSAP ScrollTrigger for production-level scroll animations.",
    highlightColor: "bg-[#FF3366] text-white",
    image: asset("Gemini_Generated_Image_.jpg"),
    url: "https://skylineagc.vercel.app/",
    figmaLink: "https://www.figma.com/design/Ut2PAlntXyzo3ARE5Vdfiz/SkyLine?node-id=3311-2&p=f&t=BQVu8MNRAkkaHTwG-0",
  },
  xiachat: {
    id: "xiachat",
    title: "Xia Chat",
    subtitle: "AI-Assisted End-to-End Customer Support Platform",
    tag: "SaaS OmniChannel",
    year: "2026 JULY",
    timeline: "July 2026 – Ongoing Project",
    timelineNote: "Continuous design, development, and iterative deployment.",
    tools: ["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Render", "Node.js", "Express", "Socket.IO", "Stripe", "Vercel", "Antigravity AI"],
    bgColor: "bg-[#09090B]",
    roles: ["UI/UX Designer", "Full Stack Developer"],
    desc: "A modern AI-powered customer support SaaS platform built to help businesses manage website visitors, AI conversations, and live agent support within a single workspace.",
    overview:
      "Xia Chat is a comprehensive omnichannel customer support SaaS platform designed and engineered from the ground up to unify website visitor engagement, automated AI assistance, and real-time live agent support in a single workspace.\n\nThe project began in Figma with end-to-end user flow mapping, state machine planning, and high-fidelity UI/UX design. It was then implemented into a responsive React frontend adhering strictly to Figma specifications, backed by a scalable architecture connecting Supabase, custom backend services on Render, and real-time WebSockets.",
    gallery: [
      "https://via.placeholder.com/1400x900/09090B/a8a29e?text=Xia+Chat+Dashboard",
      "https://via.placeholder.com/800x1000/09090B/a8a29e?text=Mobile+Chat+View",
      "https://via.placeholder.com/1000x800/09090B/a8a29e?text=AI+Agent+Configuration",
    ],
    figmaScreenshot: asset("xiachat-logo.png"),
    iframeUrl: "https://xiachatv3.vercel.app/",
    figmaProcess: [
      { step: "01", title: "User Flows & State Architecture", desc: "Mapped comprehensive user journeys and state diagrams in Figma — defining conversation life cycles, visitor session tracking, live agent routing logic, and real-time connection state transitions." },
      { step: "02", title: "High-Fidelity UI/UX Design System", desc: "Crafted a clean, scalable component library and visual hierarchy for both the enterprise dashboard and the embeddable chat widget, establishing cohesive typography, color tokens, and responsive mobile-first layouts." },
      { step: "03", title: "Interaction & State Prototyping", desc: "Prototyped critical UX micro-interactions including real-time typing indicators, online/offline presence badges, lead capture modals, and dynamic message status updates to test usability before engineering." },
    ],
    designToCode: [
      { step: "04", title: "Figma-to-Code Frontend Engineering", desc: "Translated the Figma UI components into production-ready React and Next.js interfaces with Tailwind CSS — ensuring 1:1 pixel parity, smooth micro-interactions, responsive adaptability, and building a lightweight embeddable widget script." },
      { step: "05", title: "Backend Infrastructure (Supabase & Render)", desc: "Architected a scalable backend connecting Supabase for relational data storage, real-time database subscriptions, and secure Row-Level Security (RLS) policies, alongside Node.js/Express API microservices deployed on Render." },
      { step: "06", title: "Real-Time Synchronization & Cloud CI/CD", desc: "Implemented Socket.IO WebSockets for instantaneous bidirectional communication between visitors and agents, integrated Stripe subscription billing and Google OAuth, and deployed the frontend to Vercel and backend to Render." },
    ],
    keyMetric: "Xia Chat represents a complete bridge between design and engineering. By planning comprehensive user flows and state machines in Figma before writing code, I built a cohesive full-stack architecture with React, Supabase, and Render that handles real-time customer support at scale.",
    highlightColor: "bg-[#06B6D4] text-black",
    image: asset("xiachat-cover.png"),
    url: "https://xiachatv3.vercel.app/",
    figmaLink: "https://www.figma.com/design/KyE1Pqiyzc8ucg3clMAhiw/Untitled?node-id=0-1&p=f&t=G8nm1Dmbw8JCeOoD-0",
    keyFeatures: [
      "User Flow & State Design (Figma)",
      "Pixel-Perfect UI Implementation",
      "Supabase Backend & Real-time Sync",
      "Render Cloud Infrastructure",
      "AI + Human Live Agent Handoff",
      "Real-time WebSocket Messaging",
      "Embeddable Chat Widget",
      "Workspace & Multi-tenant Admin",
      "Stripe Subscription Billing",
      "Visitor Analytics & Tracking",
    ],
  },
};

/** Ordered list of case study slugs for rendering in sequence. */
export const CASE_STUDY_ORDER = ["xiachat", "skyline", "dmar", "aura"] as const;

/** Stacking config for the sticky card layout. */
export const CASE_STUDY_STACK_CONFIG = [
  { topOffset: "top-24", zIndex: "z-10" },
  { topOffset: "top-32", zIndex: "z-20" },
  { topOffset: "top-40", zIndex: "z-30" },
  { topOffset: "top-48", zIndex: "z-40" },
];
