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
    tag: "SaaS Platform",
    year: "2026 JULY",
    timeline: "July 2026 – Ongoing Project",
    timelineNote: "Continuous design, development, and iterative deployment.",
    tools: ["ChatGPT", "Antigravity AI", "React", "Next.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Stripe", "Vercel", "Render"],
    bgColor: "bg-[#09090B]",
    roles: ["UI/UX Designer", "Full Stack Developer"],
    desc: "A modern AI-powered customer support SaaS platform built to help businesses manage website visitors, AI conversations, and live agent support within a single workspace.",
    overview:
      "Xia Chat is a modern AI-powered customer support SaaS platform built to help businesses manage website visitors, AI conversations, and live agent support within a single workspace.\n\nThis was my first end-to-end SaaS project, where I combined Design Thinking with AI-assisted workflows and full-stack development to transform an idea into a production-ready application.",
    gallery: [
      "https://via.placeholder.com/1400x900/09090B/a8a29e?text=Xia+Chat+Dashboard",
      "https://via.placeholder.com/800x1000/09090B/a8a29e?text=Mobile+Chat+View",
      "https://via.placeholder.com/1000x800/09090B/a8a29e?text=AI+Agent+Configuration",
    ],
    figmaScreenshot: asset("xiachat-logo.png"),
    iframeUrl: "https://xiachat-pied.vercel.app/",
    figmaProcess: [
      { step: "01", title: "Research & Design Thinking", desc: "Studied existing customer support SaaS platforms to understand common UX patterns, dashboard structures, and enterprise workflows. Focused on identifying pain points to create a simpler and more scalable experience." },
      { step: "02", title: "Product Planning", desc: "Used Design Thinking principles to define product goals, user journeys, information architecture, sitemap, dashboard navigation, feature priorities, and user flows. ChatGPT was used as a brainstorming partner to challenge ideas and refine the product structure." },
      { step: "03", title: "Prompt Iteration", desc: "Instead of relying on a single prompt, I developed an iterative workflow — continuously writing, testing, refining, and improving prompts until the generated outputs aligned with the intended UX and product requirements." },
    ],
    designToCode: [
      { step: "04", title: "AI-Assisted Design & Development", desc: "Antigravity AI was used as a development assistant to accelerate implementation. I directed the workflow by defining requirements, reviewing generated code, requesting revisions, validating functionality, and refining UI decisions." },
      { step: "05", title: "Full-Stack Development", desc: "Implemented the application from frontend to backend — React/Next.js frontend, Node.js & Express backend, MongoDB database, REST APIs, Socket.IO real-time chat, Stripe subscription billing, Google authentication, workspace management, chat widget, and deployment on Vercel & Render." },
      { step: "06", title: "Testing & Refinement", desc: "Refined the product through continuous iterations including responsive optimization, cross-device testing, widget improvements, dashboard usability, billing verification, performance improvements, and UI consistency reviews." },
    ],
    keyMetric: "Xia Chat was my first complete SaaS product and marked a significant step in my growth as both a UI/UX Designer and Full-Stack Developer. The project taught me how Design Thinking, AI-assisted workflows, and software engineering can work together to build a real-world product from concept through deployment.",
    highlightColor: "bg-[#06B6D4] text-black",
    image: asset("xiachat-cover.png"),
    url: "https://xiachat-pied.vercel.app/",
    figmaLink: "",
    keyFeatures: [
      "AI + Human Agent Chat",
      "Real-time Messaging",
      "Website Chat Widget",
      "Widget Customization",
      "Workspace Management",
      "Team Collaboration",
      "Visitor Analytics",
      "Stripe Billing",
      "Google OAuth",
      "Responsive Dashboard",
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
