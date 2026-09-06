/**
 * App.tsx — The main orchestrator.
 *
 * Performance & Architecture:
 *  - Specific hook imports to ensure perfect tree-shaking
 *  - Code-split CaseStudyModal via React.lazy & Suspense
 *  - 100% preservation of components, sections, interactions, and responsive design
 */
import { useRef, useState, lazy, Suspense } from "react";
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
import SplashScreen from "./components/ui/SplashScreen";
import MobileNav from "./components/MobileNav";

// Section components
import {
  HeroSection,
  ToolsMarquee,
  SkillsSection,
  ExperienceSection,
  CaseStudiesSection,
  Footer,
} from "./components/sections";

// Smart Rendering: lazy load heavy modal on demand
const CaseStudyModal = lazy(() => import("./components/CaseStudyModal"));

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
            ? "scale-[0.85] translate-x-[70%] sm:translate-x-[50%] rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden pointer-events-none" 
            : "rounded-none pointer-events-auto"
        }`}
      >
        {/* Floating elements (positioned absolutely / fixed) */}
        <MagicalImage />
        <CursorElements />

        {/* Non-sticky absolute layer for Back to Resume icon, scrolls away normally */}
        <div className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex items-center justify-between z-[90] pointer-events-none">
          <div /> {/* Empty left side */}
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
            <a
              href="https://awgresume.vercel.app/"
              title="Back to Resume"
              className="pointer-events-auto flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background/80 backdrop-blur-md hover:bg-foreground hover:text-background transition-colors duration-300 text-foreground shadow-sm group"
            >
              <User size={18} className="group-hover:scale-110 transition-transform duration-300 sm:w-5 sm:h-5" />
            </a>
            <div className="w-10 sm:w-12 md:w-[160px] h-10 sm:h-12" /> {/* Spacer for the Hamburger/CTA */}
          </div>
        </div>

        <Header activeSection={activeSection} onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        {/* Main content sections */}
        <main className="relative w-full mx-auto flex-1 flex flex-col items-center pt-16 md:pt-24 mb-16 md:mb-24 px-4 sm:px-8 max-w-[1920px]">
          <HeroSection />
          <ToolsMarquee />
          <CaseStudiesSection onOpenStudy={setActiveCaseStudy} />
          <ExperienceSection />
          <SkillsSection />
        </main>

        <Footer />
        
        {/* Fade out fixed elements when drawer is open to prevent transform containing block teleportation */}
        <div className={`transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`}>
          <ThemeToggle />
        </div>

        {/* Invisible Overlay to close nav when clicking main container */}
        {isMobileNavOpen && (
          <div 
            className="absolute inset-0 z-[9999] cursor-pointer pointer-events-auto" 
            onClick={() => setIsMobileNavOpen(false)} 
          />
        )}
      </div>

      {/* Overlays: Lazy loaded modal loaded on demand */}
      <Suspense fallback={null}>
        {activeCaseStudy && (
          <CaseStudyModal
            activeStudySlug={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
