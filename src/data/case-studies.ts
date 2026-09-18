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
    timelineNote: "Continuous design, development & active Mobile App engineering (iOS/Android).",
    tools: ["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Supabase", "Render", "Node.js", "Express", "Socket.IO", "Stripe", "Vercel", "Antigravity AI"],
    bgColor: "bg-[#09090B]",
    roles: ["UI/UX Designer", "Full Stack Developer"],
    desc: "A modern AI-powered customer support SaaS platform built to help businesses manage website visitors, AI conversations, and live agent support within a single workspace.",
    overview:
      "Xia Chat is a comprehensive omnichannel customer support SaaS platform designed and engineered from the ground up to unify website visitor engagement, automated AI assistance, and real-time live agent support in a single workspace.\n\nThe project began in Figma with end-to-end user flow mapping, state machine planning, and high-fidelity UI/UX design. It was then implemented into a responsive React frontend adhering strictly to Figma specifications, backed by a scalable architecture connecting Supabase, custom backend services on Render, and real-time WebSockets.\n\nTo empower support teams on-the-go, active engineering is currently underway to expand Xia Chat into dedicated cross-platform mobile companion applications (iOS & Android) featuring instantaneous push alerts and seamless mobile inbox management.",
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
      { step: "07", title: "Mobile App Expansion (In Active Development)", desc: "Currently engineering cross-platform native mobile applications (iOS & Android) with React Native — extending the platform to support real-time push alerts, offline message queuing, and mobile agent inboxes for on-the-go support." },
    ],
    keyMetric: "Xia Chat represents a complete bridge between design and full-stack engineering. By planning comprehensive user flows and state machines in Figma before writing code, I built a cohesive ecosystem across web and cloud. The journey continues with active mobile app development to bring the full live-chat experience to iOS and Android.",
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
      "Mobile App Expansion (In Progress)",
      "Workspace & Multi-tenant Admin",
      "Stripe Subscription Billing",
      "Visitor Analytics & Tracking",
    ],
  },
  himopay: {
    id: "himopay",
    title: "Himo Pay",
    subtitle: "Next-Gen FinTech Mobile Wallet & Digital Payment Ecosystem",
    tag: "FinTech • Mobile App",
    year: "2026 SEPT",
    timeline: "August – September 2026",
    timelineNote: "Grounded in deep UX/CX research, custom design tokens, product landing page, and production-ready Flutter mobile engineering.",
    tools: ["Flutter", "Dart", "Figma", "Supabase", "Clean Architecture", "UI/UX Research", "CX Research", "Tailwind CSS", "Antigravity AI"],
    bgColor: "bg-[#0B1220]",
    roles: ["Lead Product Designer", "UX & CX Researcher", "Flutter Mobile Engineer"],
    desc: "A calm, premium digital payment ecosystem built with Flutter. Designed through extensive UX and CX research to eliminate financial friction for Myanmar users with 60-second onboarding, zero-fee P2P transfers, and a tailored design system.",
    overview:
      "Himo Pay is a full-featured digital wallet and financial services ecosystem conceived, designed, and developed to bring modern financial empowerment to users in Myanmar. Traditional banking and payment apps in the region often suffer from clunky navigation, intimidating financial jargon, slow branch-dependent KYC, and surprise transaction fees. Himo Pay directly dismantles these pain points.\n\nThe project was driven by a disciplined research-first philosophy: conducting user interviews (UX Research) to understand everyday cash habits and usability barriers, followed by customer journey mapping (CX Research) to build transparent pricing and long-term customer trust. From these insights, I created a custom design system centered around high-contrast fintech palettes (Brand Orange #FF5E14 and Deep Navy #0B1F3A), bespoke monochrome iconography, and high-fidelity prototypes covering over 25 mobile screens.\n\nTo translate this vision into reality, I engineered the mobile client from scratch using Flutter and Dart, implementing Clean Architecture with feature-first modularity (Auth, Wallet, P2P Transfers, QR Payments, Service Grid, and Tier Rewards). Finally, I built a high-converting product landing page that allows users to directly download the official production APK and scan a dynamic QR code for instant mobile installation.",
    gallery: [
      asset("himopay-hero.jpg"),
      asset("himopay-design-system.png"),
      asset("himopay-campaign.jpg"),
      asset("himopay-rewards.jpg"),
      asset("himopay-qr.png"),
    ],
    figmaScreenshot: asset("himopay-design-system.png"),
    figmaProcess: [
      {
        step: "01",
        title: "UX & CX Research & Discovery",
        desc: "Conducted user interviews and journey mapping with everyday Myanmar consumers and merchants. Identified key friction points: 15-minute tedious onboarding, hidden transaction fees, and cognitive overload during payments.",
      },
      {
        step: "02",
        title: "Design System & Token Architecture",
        desc: "Crafted a comprehensive fintech design foundation in Figma: establishing semantic color tokens (Brand Orange #FF5E14, Primary Navy #0B1F3A, Charcoal #0D1117), consistent typography scale (Plus Jakarta Sans/Inter), 4-column service grid, and bespoke monochrome icon set.",
      },
      {
        step: "03",
        title: "Interactive Flow Prototyping & Ergonomics",
        desc: "Engineered ergonomic mobile prototypes focused on the 'thumb zone' for one-handed operation. Designed 1-tap balance privacy toggling, high-speed QR scan-and-pay camera viewfinders, and clear digital receipt generation.",
      },
    ],
    designToCode: [
      {
        step: "01",
        title: "Flutter Clean Architecture & Feature Modularity",
        desc: "Structured the codebase using Clean Architecture with feature-first separation (features/auth, features/home, features/wallet, features/transfer, features/qr). Separated Presentation, Domain, and Data layers to guarantee testability and maintainability.",
      },
      {
        step: "02",
        title: "Design Tokens to Flutter Theming Parity",
        desc: "Translated Figma tokens directly into Dart constants (AppColors, AppSpacing, AppRadius, AppTextStyles). Built custom reusable widgets for balance cards, action buttons, service grid items, and promotional banners with pixel-perfect accuracy down to 320px screen widths.",
      },
      {
        step: "03",
        title: "Supabase Backend, Biometrics & Security",
        desc: "Integrated Supabase for secure cloud authentication, database tables, and Row-Level Security (RLS). Implemented device biometric authentication (FaceID/Fingerprint) and PIN authorization before executing any financial transfers.",
      },
      {
        step: "04",
        title: "Product Landing Page & Direct APK Distribution",
        desc: "Designed and launched a modern product landing page equipped with direct APK release downloads (v1.0.0, 61.9 MB clean build), scannable QR camera download flow, problem/solution comparisons, and GitHub repository integration.",
      },
    ],
    keyMetric:
      "Bridged deep UX/CX user research with production Flutter mobile engineering — slashing onboarding time from 15 minutes to under 60 seconds and shipping a real, downloadable 60fps Flutter mobile application with a complete design system.",
    highlightColor: "bg-[#FF5E14] text-white",
    image: asset("himopay-hero.jpg"),
    url: "https://himopay.vercel.app/home",
    figmaLink: "https://www.figma.com/design/KyE1Pqiyzc8ucg3clMAhiw/Untitled?node-id=0-1&p=f&t=G8nm1Dmbw8JCeOoD-0",
    apkDownloadUrl: asset("downloads/HimoPay-release.apk"),
    apkSize: "61.9 MB (Clean Universal Release)",
    apkVersion: "v1.0.0",
    qrCodeImage: asset("himopay-qr.png"),
    uxResearch: [
      {
        title: "60-Second Frictionless KYC Onboarding",
        desc: "Traditional banking apps in Myanmar require physically visiting a branch or completing multi-page complex forms. Himo Pay compresses identity verification into 3 simple, guided mobile steps completed in under 1 minute.",
      },
      {
        title: "Ergonomic One-Handed Thumb Zone",
        desc: "Primary actions (Send, Cash In, Cash Out, QR Scan) are positioned within the natural bottom arc of the thumb, enabling effortless one-handed operation on any screen size from 320px to 393px+.",
      },
      {
        title: "Cognitive Load & Visual Calmness",
        desc: "Replaced cluttered banking dashboards with a calm, hierarchical balance view, featuring a 1-tap privacy eye toggle to hide balance in public, avoiding anxiety and visual noise.",
      },
      {
        title: "Clarity in Transaction Verification",
        desc: "Designed distinct multi-step transfer confirmation with biometric verification and instant shareable digital receipts, preventing accidental transfers.",
      },
    ],
    cxResearch: [
      {
        title: "100% Transparent Zero-Fee Model",
        desc: "CX interviews revealed that hidden surcharges erode customer trust faster than any technical bug. Himo Pay guarantees 0% transfer fees on all P2P and merchant QR transactions with explicit cost transparency.",
      },
      {
        title: "Gamified VIP Tier Loyalty (Bronze to Platinum)",
        desc: "Created emotional customer stickiness and lifetime value (LTV) through an automatic tier progression system offering escalating cashbacks, partner coffee/dining vouchers, and priority support.",
      },
      {
        title: "Biometric Peace of Mind",
        desc: "Built confidence through visible security indicators — FaceID / Fingerprint approval prompts, AES-256 cloud encryption badges, and instant transaction notifications.",
      },
      {
        title: "Seamless On-Demand Customer Support",
        desc: "Embedded in-app assistance and clear contextual error states with actionable recovery paths, turning potential frustration into a smooth resolution.",
      },
    ],
    designTokens: [
      { name: "Brand Orange", hex: "#FF5E14", role: "Primary Brand Accent & Interactive CTA" },
      { name: "Primary Navy", hex: "#0B1F3A", role: "Financial Authority & Institutional Trust" },
      { name: "Dark Canvas", hex: "#0D1117", role: "Premium Dark Card & Background Depth" },
      { name: "Card Charcoal", hex: "#161B22", role: "Elevated Component Surface" },
      { name: "Off-White", hex: "#FAFBFC", role: "Clean Content Background" },
      { name: "Success Emerald", hex: "#10B981", role: "Verified Transfers & Security" },
    ],
    keyFeatures: [
      "Flutter Cross-Platform Architecture",
      "60s Onboarding KYC Verification",
      "Zero-Fee Instant QR & P2P Transfers",
      "Bespoke FinTech Design System & Tokens",
      "VIP Loyalty Tier Rewards (Bronze to Platinum)",
      "Clean Architecture (Data, Domain, Presentation)",
      "Supabase Realtime & Row-Level Security",
      "Biometric FaceID & PIN Security Gates",
      "Dedicated Product Landing Page",
      "Direct APK (v1.0.0) Android Distribution",
      "Scannable Mobile Camera QR Download",
      "Laser-Engraved Virtual & NFC Cards",
    ],
  },
};

/** Ordered list of case study slugs for rendering in sequence. */
export const CASE_STUDY_ORDER = ["himopay", "xiachat", "skyline", "dmar", "aura"] as const;

/** Stacking config for the sticky card layout. */
export const CASE_STUDY_STACK_CONFIG = [
  { topOffset: "top-20", zIndex: "z-10" },
  { topOffset: "top-28", zIndex: "z-20" },
  { topOffset: "top-36", zIndex: "z-30" },
  { topOffset: "top-44", zIndex: "z-40" },
  { topOffset: "top-52", zIndex: "z-50" },
];
