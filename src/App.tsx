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
import { User } from "lucide-react";

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
import SplashScreen from "./components/ui/SplashScreen";

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
    <div className="relative w-full min-h-screen bg-foreground overflow-x-clip">
      {/* 0. Splash Screen */}
      <SplashScreen />

      {/* 1. Underlying Mobile Nav Menu */}
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
        activeSection={activeSection} 
      />

      {/* 2. Scalable Main Content Container */}
      <div 
        ref={containerRef} 
        className={`w-full relative bg-background transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] origin-right ${
          isMobileNavOpen 
            ? "scale-[0.85] translate-x-[65%] sm:translate-x-[50%] rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden pointer-events-none" 
            : "rounded-none pointer-events-auto"
        }`}
      >
        {/* Floating elements (positioned absolutely / fixed) */}
        <MagicalImage />
        <CursorElements />

        {/* Non-sticky absolute layer for Back to Resume icon, scrolls away normally */}
        <div className="absolute top-0 left-0 w-full px-6 md:px-10 py-6 flex items-center justify-between z-[90] pointer-events-none">
          <div /> {/* Empty left side */}
          <div className="flex items-center gap-4">
            <a
              href="https://awgresume.vercel.app/"
              title="Back to Resume"
              className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full border border-gray-200/50 dark:border-white/20 bg-background/50 backdrop-blur-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 text-foreground shadow-sm group"
            >
              <User size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <div className="w-12 md:w-[150px] h-12" /> {/* Spacer for the Hamburger/CTA */}
          </div>
        </div>

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
        
        {/* Fade out fixed elements when drawer is open to prevent transform containing block teleportation */}
        <div className={`transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`}>
          <ThemeToggle />
          <ChatAgent />
        </div>

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
