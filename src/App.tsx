/**
 * App.tsx — The main orchestrator.
 *
 * This file is now a clean ~60-line shell that:
 *  1. Wires up custom hooks (animations, nav state, scroll lock)
 *  2. Manages the single piece of local state (active case study)
 *  3. Composes all section components in layout order
 *
 * All data, logic, icons, and section markup live in their own modules.
 */
import { useRef, useState } from "react";

// Hooks
import { useActiveSection } from "./hooks/useActiveSection";
import { useBodyOverflow } from "./hooks/useBodyOverflow";
import { useGSAPAnimations } from "./hooks/useGSAPAnimations";

// Layout components
import Header from "./components/Header";
import MagicalImage from "./components/MagicalImage";
import CursorElements from "./components/CursorElements";
import ThemeToggle from "./components/ThemeToggle";
import CaseStudyModal from "./components/CaseStudyModal";
import ChatAgent from "./components/ui/chat-agent";

// Section components
import HeroSection from "./components/sections/HeroSection";
import ToolsMarquee from "./components/sections/ToolsMarquee";
import SkillsSection from "./components/sections/SkillsSection";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import CaseStudiesSection from "./components/sections/CaseStudiesSection";
import Footer from "./components/sections/Footer";

import MobileNav from "./components/MobileNav";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Custom hooks — each encapsulates a single responsibility
  const activeSection = useActiveSection();
  useBodyOverflow(!!activeCaseStudy || isMobileNavOpen);
  useGSAPAnimations(containerRef);

  return (
    <div className="relative w-full min-h-screen bg-foreground overflow-hidden">
      {/* 1. Underlying Mobile Nav Menu */}
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
        activeSection={activeSection} 
      />

      {/* 2. Scalable Main Content Container */}
      <div 
        ref={containerRef} 
        className={`w-full relative min-h-screen bg-background transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] origin-right ${
          isMobileNavOpen 
            ? "scale-[0.85] translate-x-[65%] sm:translate-x-[50%] rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden pointer-events-none" 
            : "scale-100 translate-x-0 rounded-none pointer-events-auto"
        }`}
      >
        {/* Floating elements (positioned absolutely / fixed) */}
        <MagicalImage />
        <CursorElements />
        <Header activeSection={activeSection} onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        {/* Main content sections */}
        <main className="relative w-full mx-auto flex-1 flex flex-col items-center pt-24 mb-24 px-4 sm:px-8 max-w-[1920px]">
          <HeroSection />
          <ToolsMarquee />
          <SkillsSection />
          <AboutSection />
          <ExperienceSection />
          <CaseStudiesSection onOpenStudy={setActiveCaseStudy} />
        </main>

        <Footer />
        <ThemeToggle />

        {/* Floating Chat */}
        <ChatAgent />

        {/* Invisible Overlay to close nav when clicking main container */}
        {isMobileNavOpen && (
          <div 
            className="absolute inset-0 z-[9999] cursor-pointer pointer-events-auto" 
            onClick={() => setIsMobileNavOpen(false)} 
          />
        )}
      </div>

      {/* Overlays (Keep Modals outside the scalable container so they can be full-screen) */}
      <CaseStudyModal
        activeStudySlug={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </div>
  );
}
