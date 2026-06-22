import React, { useRef } from "react";
import type { CaseStudy } from "../types";
import { CASE_STUDIES } from "../data/case-studies";
import ProcessStepList from "./ProcessStepList";
import { FigmaLogoDetailed, DiagonalArrowIcon } from "./icons";

interface Props {
  activeStudySlug: string | null;
  onClose: () => void;
}

/**
 * Full-screen split-screen case study modal.
 * Left panel: parallax hero image. Right panel: scrollable editorial content.
 */
export default function CaseStudyModal({ activeStudySlug, onClose }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translateY(${e.currentTarget.scrollTop * 0.15}px)`;
    }
  };

  const study: CaseStudy | undefined = activeStudySlug
    ? CASE_STUDIES[activeStudySlug]
    : undefined;

  return (
    <div
      className={`fixed inset-0 z-[200] transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${activeStudySlug ? "translate-y-0" : "translate-y-[100%]"}`}
      style={{ pointerEvents: activeStudySlug ? "auto" : "none" }}
    >
      {study && (
        <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
          {/* ═══ LEFT PANEL — Fixed Image ═══ */}
          <div className="w-full lg:w-[50vw] h-[35vh] sm:h-[40vh] lg:h-full relative flex-shrink-0 overflow-hidden bg-black">
            <div ref={parallaxRef} className="absolute inset-0 w-full h-[115%] -top-[5%] will-change-transform">
              <img src={study.image} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.03]" alt={study.title} />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            {/* Corner marks */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/30 hidden lg:block" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/30 hidden lg:block" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/30 hidden lg:block" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/30 hidden lg:block" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:top-auto lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 z-10">
              <span className="inline-block px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase bg-black/60 text-white backdrop-blur-sm">
                {study.tag} — {study.year}
              </span>
            </div>
          </div>

          {/* ═══ RIGHT PANEL — Scrollable Content ═══ */}
          <div className="w-full lg:w-[50vw] h-[65vh] sm:h-[60vh] lg:h-full overflow-y-auto flex flex-col bg-white dark:bg-[#0a0a0a] scroll-smooth" onScroll={handleScroll}>
            {/* Sticky nav bar */}
            <div className="sticky top-0 w-full flex justify-between items-stretch bg-background/95 backdrop-blur-sm z-[220] border-b border-border">
              <div className="flex items-center">
                <div className="bg-foreground text-background font-bold text-[11px] flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] flex-shrink-0 tracking-[0.15em] uppercase">GOUKI</div>
                <div className="flex flex-col ml-5 sm:ml-6">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">Case Study</span>
                  <span className="font-bold text-sm sm:text-base text-foreground mt-0.5">{study.tag} —</span>
                </div>
              </div>
              <button onClick={onClose} className="flex items-center group cursor-pointer">
                <span className="font-bold text-sm mr-4 sm:mr-6 text-muted-foreground group-hover:text-gray-900 dark:group-hover:text-white transition-colors tracking-widest uppercase">Close</span>
                <div className="bg-foreground text-background flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] flex-shrink-0 transition-all duration-300 group-hover:bg-blue-900 group-hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col flex-grow">
              {/* Headline */}
              <div className="mb-12 lg:mb-16">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[0.92] text-foreground mb-6 tracking-[-0.03em]">{study.title} —</h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-normal leading-[1.4] tracking-[-0.01em] text-muted-foreground max-w-xl">{study.desc}</p>
                <div className="grid grid-cols-2 gap-8 mt-10 max-w-lg border-l-2 border-gray-900 dark:border-white pl-6">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2">Timeline / Deadline</h4>
                    <p className="text-sm font-bold text-foreground">{study.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2">Tools Used</h4>
                    <p className="text-sm font-bold text-foreground">{study.tools.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-12 lg:mb-16" />

              {/* Role + Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-12 mb-12 lg:mb-14">
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">My Role —</h3>
                  <ul className="flex flex-col gap-0">
                    {study.roles.map((role, idx) => (
                      <li key={role} className="flex items-center gap-4 py-4 border-b border-border/60 text-[15px] text-gray-700 dark:text-gray-300 group">
                        <span className="text-[11px] font-bold tracking-widest text-gray-300 dark:text-gray-600 font-display tabular-nums">0{idx + 1}</span>
                        <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">Overview —</h3>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-[1.7]">{study.overview}</p>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900/50 border border-border mb-12 lg:mb-14">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-3">Key Takeaway</span>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl">{study.keyMetric}</p>
              </div>

              {/* Figma Process */}
              <div className="mb-12 lg:mb-14">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">Figma Design Process —</h3>
                <div className="relative overflow-hidden border border-border group mb-8">
                  <img src={study.figmaScreenshot} alt={`${study.title} Figma Design`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">Figma → Code</span>
                  </div>
                </div>
                <ProcessStepList steps={study.figmaProcess} />
              </div>

              {/* AI Process */}
              <div className="mb-0">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">AI-Prototyping Process —</h3>
                {study.aiScreenshot ? (
                  <div className="relative overflow-hidden border border-border group mb-8">
                    <img src={study.aiScreenshot} alt={`${study.title} AI Prototyping`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">{study.id === "aura" ? "CodeEditor + Live Preview" : "Interactive Live Demo"}</span>
                    </div>
                  </div>
                ) : study.iframeUrl ? (
                  <div className="relative overflow-hidden border border-border group mb-8 h-[400px]">
                    <div className="w-full h-[800px] overflow-hidden" style={{ transform: "scale(0.5)", transformOrigin: "0 0", width: "200%" }}>
                      <iframe src={study.iframeUrl} className="w-full h-full border-0 pointer-events-none" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">Live Site Preview</span>
                    </div>
                  </div>
                ) : null}
                <ProcessStepList steps={study.designToCode} />
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 lg:mt-20 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-foreground font-bold tracking-[0.1em] uppercase text-sm group">
                    <span className="group-hover:text-blue-900 transition-colors duration-300">Launch Live Project</span>
                    <span className="w-10 h-10 bg-foreground text-background flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                      <DiagonalArrowIcon />
                    </span>
                  </a>
                  {study.figmaLink && (
                    <>
                      <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-800" />
                      <a href={study.figmaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-bold tracking-[0.1em] uppercase text-[12px] transition-colors duration-300 group">
                        <FigmaLogoDetailed />
                        <span className="border-b border-transparent group-hover:border-gray-900 dark:group-hover:border-white pb-0.5 transition-colors">View Figma File</span>
                      </a>
                    </>
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-300 dark:text-gray-600 mt-4 sm:mt-0">© {study.year} Gouki Design</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
