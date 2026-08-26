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
 * Left panel: hero image. Right panel: scrollable editorial content with primary Maroon accents and hover states.
 */
export default function CaseStudyModal({ activeStudySlug, onClose }: Props) {
  const study: CaseStudy | undefined = activeStudySlug
    ? CASE_STUDIES[activeStudySlug]
    : undefined;

  const isXiaChat = study?.id === "xiachat";

  return (
    <div
      className={`fixed inset-0 z-[200] transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${activeStudySlug ? "translate-y-0" : "translate-y-[100%]"}`}
      style={{ pointerEvents: activeStudySlug ? "auto" : "none" }}
    >
      {study && (
        <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
          {/* ═══ LEFT PANEL — Fixed Image ═══ */}
          <div className="w-full lg:w-[50vw] h-[35vh] sm:h-[40vh] lg:h-full relative flex-shrink-0 overflow-hidden bg-black">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={study.image}
                className="w-full h-full transition-transform duration-1000 hover:scale-[1.03] object-cover"
                alt={study.title}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            {/* Corner marks */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/30 hidden lg:block" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/30 hidden lg:block" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/30 hidden lg:block" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/30 hidden lg:block" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:top-auto lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 z-10">
              <span className={`inline-block px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase backdrop-blur-sm ${isXiaChat ? "bg-black/70 text-white" : "bg-black/60 text-white"}`}>
                {study.tag} — {study.year}
              </span>
            </div>
          </div>

          {/* ═══ RIGHT PANEL — Scrollable Content ═══ */}
          <div className="w-full lg:w-[50vw] h-[65vh] sm:h-[60vh] lg:h-full overflow-y-auto flex flex-col bg-background scroll-smooth">
            {/* Sticky nav bar */}
            <div className="sticky top-0 w-full flex justify-between items-stretch bg-background/95 backdrop-blur-sm z-[220] border-b border-border">
              <div className="flex items-center">
                <div className="bg-primary text-primary-foreground font-bold text-[10px] sm:text-[11px] flex items-center justify-center w-14 h-14 sm:w-[72px] sm:h-[72px] flex-shrink-0 tracking-[0.15em] uppercase">GOUKI</div>
                <div className="flex flex-col ml-4 sm:ml-6">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">Case Study</span>
                  <span className="font-bold text-xs sm:text-base text-foreground mt-0.5">{study.tag} —</span>
                </div>
              </div>
              <button onClick={onClose} className="flex items-center group cursor-pointer">
                <span className="font-bold text-xs sm:text-sm mr-3 sm:mr-6 text-muted-foreground group-hover:text-primary transition-colors tracking-widest uppercase">Close</span>
                <div className="bg-primary text-primary-foreground flex items-center justify-center w-14 h-14 sm:w-[72px] sm:h-[72px] flex-shrink-0 transition-all duration-300 group-hover:bg-primary/90">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-10 lg:p-12 xl:p-16 flex flex-col flex-grow">

              {/* ── Headline ── */}
              <div className="mb-8 sm:mb-12 lg:mb-16">
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[0.95] text-foreground mb-3 tracking-[-0.03em]">{study.title} —</h1>
                {study.subtitle && (
                  <p className="text-sm sm:text-lg font-semibold text-muted-foreground mb-3 sm:mb-4 tracking-[-0.01em]">{study.subtitle}</p>
                )}
                <p className="text-sm sm:text-xl lg:text-2xl font-normal leading-[1.5] sm:leading-[1.4] tracking-[-0.01em] text-muted-foreground max-w-xl mt-3 sm:mt-4">{study.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-10 max-w-lg border-l-2 border-primary pl-4 sm:pl-6">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                      {isXiaChat ? "Duration" : "Timeline / Deadline"}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-foreground">{study.timeline}</p>
                    {study.timelineNote && (
                      <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-1 leading-snug">{study.timelineNote}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5 sm:mb-2">Tools</h4>
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed">{study.tools.join(" • ")}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border mb-8 sm:mb-12 lg:mb-16" />

              {/* ── Role + Overview ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-14">
                <div>
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">Role —</h3>
                  <ul className="flex flex-col gap-0">
                    {study.roles.map((role, idx) => (
                      <li key={role} className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-border/60 text-xs sm:text-[15px] text-foreground/80 group">
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-primary font-display tabular-nums">0{idx + 1}</span>
                        <span className="group-hover:text-primary transition-colors font-medium">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">Project Overview —</h3>
                  {study.overview.split("\n\n").map((para, i) => (
                    <p key={i} className="text-xs sm:text-[15px] text-muted-foreground leading-[1.7] mb-4 last:mb-0">{para}</p>
                  ))}
                </div>
              </div>

              {/* ── My Process (Figma / Design steps) ── */}
              <div className="mb-8 sm:mb-12 lg:mb-14">
                <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">
                  {isXiaChat ? "My Process —" : "Figma Design Process —"}
                </h3>
                {!isXiaChat && (
                  <div className="relative overflow-hidden border border-border rounded-lg sm:rounded-none group mb-6 sm:mb-8">
                    <img src={study.figmaScreenshot} alt={`${study.title} Figma Design`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">Figma → Code</span>
                    </div>
                  </div>
                )}
                <ProcessStepList steps={study.figmaProcess} />
              </div>

              {/* ── AI-Prototyping / Design-to-Code ── */}
              <div className="mb-8 sm:mb-12 lg:mb-14">
                <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">
                  {isXiaChat ? "Development & Deployment —" : "AI-Prototyping Process —"}
                </h3>
                {study.aiScreenshot ? (
                  <div className="relative overflow-hidden border border-border rounded-lg sm:rounded-none group mb-6 sm:mb-8">
                    <img src={study.aiScreenshot} alt={`${study.title} AI Prototyping`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">{study.id === "aura" ? "CodeEditor + Live Preview" : "Interactive Live Demo"}</span>
                    </div>
                  </div>
                ) : study.iframeUrl ? (
                  <div className="relative overflow-hidden border border-border rounded-lg sm:rounded-none group mb-6 sm:mb-8 h-[260px] sm:h-[400px]">
                    <div className="w-full h-[520px] sm:h-[800px] overflow-hidden" style={{ transform: "scale(0.5)", transformOrigin: "0 0", width: "200%" }}>
                      <iframe src={study.iframeUrl} className="w-full h-full border-0 pointer-events-none" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">Live Site Preview</span>
                    </div>
                  </div>
                ) : null}
                <ProcessStepList steps={study.designToCode} />
              </div>

              {/* ── Key Features (XiaChat only) ── */}
              {study.keyFeatures && study.keyFeatures.length > 0 && (
                <div className="mb-8 sm:mb-12 lg:mb-14">
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">Key Features —</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {study.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5 sm:py-3 px-3 sm:px-4 border border-border/60 bg-muted/40 rounded-sm group hover:border-primary transition-colors duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-xs sm:text-[13px] text-foreground/80 font-medium group-hover:text-primary transition-colors">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Key Takeaway / Reflection ── */}
              <div className="p-5 sm:p-8 border-l-4 border-l-primary border-t border-r border-b border-border/80 mb-8 sm:mb-12 lg:mb-14 bg-muted/30">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-primary block mb-2 sm:mb-3">
                  {isXiaChat ? "Reflection" : "Key Takeaway"}
                </span>
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed max-w-2xl">{study.keyMetric}</p>
              </div>

              {/* ── Bottom CTA ── */}
              <div className="mt-auto pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 sm:gap-4 text-foreground font-bold tracking-[0.1em] uppercase text-xs sm:text-sm group">
                    <span className="group-hover:text-primary transition-colors duration-300">Launch Live Project</span>
                    <span className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-primary/90 transition-all duration-300 group-hover:translate-x-1 shadow-md shadow-primary/20">
                      <DiagonalArrowIcon />
                    </span>
                  </a>
                  {study.figmaLink && (
                    <>
                      <div className="hidden sm:block w-px h-8 bg-border" />
                      <a href={study.figmaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 sm:gap-3 text-muted-foreground hover:text-primary font-bold tracking-[0.1em] uppercase text-[11px] sm:text-[12px] transition-colors duration-300 group">
                        <FigmaLogoDetailed />
                        <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">View Figma File</span>
                      </a>
                    </>
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mt-2 sm:mt-0">© {study.year} Gouki Design</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
