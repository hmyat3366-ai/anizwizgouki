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

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  // Custom hooks — each encapsulates a single responsibility
  const activeSection = useActiveSection();
  useBodyOverflow(!!activeCaseStudy);
  useGSAPAnimations(containerRef);

  return (
    <div ref={containerRef} className="overflow-x-hidden w-full relative">
      {/* Floating elements (positioned absolutely / fixed) */}
      <MagicalImage />
      <CursorElements />
      <Header activeSection={activeSection} />

      {/* Main content sections */}
      <main className="relative w-full mx-auto flex-1 flex flex-col items-center pt-24 mb-24 px-4 sm:px-8">
        <HeroSection />
        <ToolsMarquee />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <CaseStudiesSection onOpenStudy={setActiveCaseStudy} />
      </main>

      <Footer />
      <ThemeToggle />

      {/* Overlays */}
      <CaseStudyModal
        activeStudySlug={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
      <ChatAgent />
    </div>
  );
}
