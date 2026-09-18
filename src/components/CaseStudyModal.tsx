import type { CaseStudy } from "../types";
import { CASE_STUDIES } from "../data/case-studies";
import ProcessStepList from "./ProcessStepList";
import { FigmaLogoDetailed, DiagonalArrowIcon, HimoPayIcon } from "./icons";
import { Download, QrCode } from "lucide-react";

interface Props {
  activeStudySlug: string | null;
  onClose: () => void;
}

/**
 * Full-screen split-screen case study modal.
 * Left panel: hero image. Right panel: scrollable editorial content with tailored accents and hover states.
 */
export default function CaseStudyModal({ activeStudySlug, onClose }: Props) {
  const study: CaseStudy | undefined = activeStudySlug
    ? CASE_STUDIES[activeStudySlug]
    : undefined;

  const isXiaChat = study?.id === "xiachat";
  const isHimoPay = study?.id === "himopay";

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
                className={`w-full h-full transition-transform duration-1000 hover:scale-[1.03] ${isHimoPay ? "object-contain p-4 sm:p-8 bg-[#090D14]" : "object-cover"}`}
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
              <span className={`inline-block px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase backdrop-blur-sm ${isHimoPay ? "bg-[#EB5A2D] text-white" : isXiaChat ? "bg-black/70 text-white" : "bg-black/60 text-white"}`}>
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
                      {isXiaChat || isHimoPay ? "Duration" : "Timeline / Deadline"}
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

              {/* ── HIMO PAY EXCLUSIVE: Mobile App Download & Product Hub ── */}
              {isHimoPay && study.apkDownloadUrl && (
                <div className="mb-8 sm:mb-12 lg:mb-14 p-5 sm:p-7 rounded-2xl border border-[#EB5A2D]/40 bg-gradient-to-br from-[#EB5A2D]/10 via-card to-background relative overflow-hidden shadow-lg group">
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#EB5A2D]/15 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EB5A2D] flex items-center justify-center text-white shadow-md shadow-[#EB5A2D]/30">
                        <HimoPayIcon className="w-5 h-5" orangeColor="#FFFFFF" rightPillarColor="#0B1220" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#EB5A2D]">Mobile App Download Hub</span>
                        <h4 className="text-base sm:text-lg font-bold text-foreground">Get Himo Pay on Android</h4>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Production APK v1.0.0
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-center">
                    <div className="flex flex-col gap-4">
                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                        Test the real production Flutter application on your mobile device. Built with Clean Architecture, 60fps native transitions, Supabase database synchronization, and biometric FaceID/PIN verification.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={study.apkDownloadUrl}
                          download="HimoPay-release.apk"
                          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-[#EB5A2D] to-[#FF7A38] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#EB5A2D]/30 hover:shadow-xl hover:shadow-[#EB5A2D]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          <div className="text-left">
                            <span className="block text-[9px] uppercase tracking-wider text-white/80">Direct Android Install</span>
                            <span className="font-bold">Download APK ({study.apkSize || "61.9 MB"})</span>
                          </div>
                        </a>

                        <a
                          href={study.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card/80 text-foreground font-bold text-xs hover:border-[#FF5E14]/60 hover:text-[#FF5E14] transition-all"
                        >
                          <svg className="w-4 h-4 text-[#FF5E14]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          <span>Launch Web App</span>
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground pt-2 border-t border-border/60 font-mono">
                        <span>• Android 7.0+ (Universal)</span>
                        <span>• arm64-v8a / x86_64</span>
                        <span>• Clean &amp; Malware-Free</span>
                      </div>
                    </div>

                    {study.qrCodeImage && (
                      <div className="flex flex-col items-start md:items-end">
                        <div className="p-3.5 bg-white rounded-xl border border-border shadow-md flex flex-col items-center">
                          <img src={study.qrCodeImage} alt="Scan QR code to download Himo Pay" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
                          <span className="text-[10px] font-bold text-black uppercase tracking-wider mt-1.5 flex items-center gap-1">
                            <QrCode className="w-3 h-3 text-[#EB5A2D]" />
                            Scan with Phone Camera
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── HIMO PAY EXCLUSIVE: UX Research & CX Research Deep Dive ── */}
              {isHimoPay && study.uxResearch && study.cxResearch && (
                <div className="mb-8 sm:mb-12 lg:mb-14">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#EB5A2D]">Research-First Methodology</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-foreground mb-3">
                    UX Research &amp; Customer Experience (CX) Architecture —
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                    Every design token, button placement, and micro-interaction in Himo Pay was informed by empirical research with Myanmar users and local merchants to dismantle traditional banking friction.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* UX Research Card */}
                    <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/60 flex flex-col">
                      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border">
                        <span className="w-8 h-8 rounded-lg bg-[#EB5A2D]/15 text-[#EB5A2D] flex items-center justify-center font-mono font-bold text-xs border border-[#EB5A2D]/30">UX</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-foreground">User Experience (UX) Engineering</h4>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Ergonomics &amp; Friction Removal</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        {study.uxResearch.map((item, idx) => (
                          <div key={idx} className="flex flex-col gap-1 text-xs">
                            <span className="font-bold text-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EB5A2D] shrink-0" />
                              {item.title}
                            </span>
                            <p className="text-muted-foreground pl-3.5 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CX Research Card */}
                    <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/60 flex flex-col">
                      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border">
                        <span className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-mono font-bold text-xs border border-primary/30">CX</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-foreground">Customer Experience (CX) Framework</h4>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Trust, Transparency &amp; Retention</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        {study.cxResearch.map((item, idx) => (
                          <div key={idx} className="flex flex-col gap-1 text-xs">
                            <span className="font-bold text-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item.title}
                            </span>
                            <p className="text-muted-foreground pl-3.5 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── HIMO PAY EXCLUSIVE: Design System & Semantic Color Tokens ── */}
              {isHimoPay && study.designTokens && (
                <div className="mb-8 sm:mb-12 lg:mb-14">
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">
                    Bespoke FinTech Design System &amp; Color Tokens —
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    {study.designTokens.map((t) => (
                      <div key={t.hex} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2">
                        <div className="w-full h-10 rounded-md border border-border/50 shadow-inner" style={{ backgroundColor: t.hex }} />
                        <div>
                          <span className="text-xs font-bold text-foreground block truncate">{t.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground block">{t.hex}</span>
                          <span className="text-[9px] text-muted-foreground/80 block mt-0.5 line-clamp-1">{t.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── My Process (Figma / Design steps) ── */}
              <div className="mb-8 sm:mb-12 lg:mb-14">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                    {isXiaChat ? "Figma UI/UX & User Flow Process —" : isHimoPay ? "Figma FinTech Design System & Flows —" : "Figma Design Process —"}
                  </h3>
                  {study.figmaLink && (
                    <a
                      href={study.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.1em] uppercase text-primary hover:underline transition-all group"
                    >
                      <FigmaLogoDetailed />
                      <span className="hidden sm:inline">Open in</span> Figma ↗
                    </a>
                  )}
                </div>
                {isXiaChat ? (
                  <a
                    href={study.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden border border-border/80 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 bg-gradient-to-r from-muted/70 via-card to-muted/40 group hover:border-primary/60 transition-all duration-300 block shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-black/50 border border-border flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                          <FigmaLogoDetailed />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              Xia Chat Figma Workspace &amp; UI/UX Specs
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase font-bold">Figma</span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                            User flows, state architecture, responsive widget design &amp; design system
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-primary border border-primary/30 px-3 py-1.5 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        View Figma File
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="relative overflow-hidden border border-border rounded-lg sm:rounded-none group mb-6 sm:mb-8">
                    <img src={study.figmaScreenshot} alt={`${study.title} Figma Design`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-white/80">{isHimoPay ? "Design System & Icon Tokens" : "Figma → Code"}</span>
                    </div>
                  </div>
                )}
                <ProcessStepList steps={study.figmaProcess} />
              </div>

              {/* ── AI-Prototyping / Design-to-Code / Flutter Architecture ── */}
              <div className="mb-8 sm:mb-12 lg:mb-14">
                <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">
                  {isXiaChat ? "Full-Stack Development & Architecture —" : isHimoPay ? "Flutter Mobile Engineering & Architecture —" : "AI-Prototyping Process —"}
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

              {/* ── Key Features ── */}
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

              {/* ── HIMO PAY EXCLUSIVE: Brand Lifestyle & VIP Loyalty Campaigns ── */}
              {isHimoPay && study.gallery.length >= 4 && (
                <div className="mb-8 sm:mb-12 lg:mb-14">
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4 sm:mb-6">
                    Editorial Brand Photography &amp; VIP Loyalty —
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group relative overflow-hidden rounded-xl border border-border">
                      <img src={study.gallery[2]} alt="Himo Pay Campaign Lifestyle" className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E14]">Everyday Usability</span>
                        <p className="text-xs text-white font-medium">Digital payments in contemporary Myanmar lifestyle settings</p>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border border-border">
                      <img src={study.gallery[3]} alt="Himo Pay Rewards & Vouchers" className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E14]">VIP Tier Loyalty</span>
                        <p className="text-xs text-white font-medium">Progressive cashback &amp; exclusive merchant discount rewards</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Mobile App Expansion Roadmap (XiaChat only) ── */}
              {isXiaChat && (
                <div className="mb-8 sm:mb-12 lg:mb-14 p-5 sm:p-6 rounded-xl border border-primary/40 bg-gradient-to-br from-primary/5 via-muted/30 to-background relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      In Active Development
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Mobile App Expansion</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <span>iOS &amp; Android Native Companion App</span>
                  </h4>
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                    Expanding Xia Chat beyond desktop browsers. Currently engineering dedicated cross-platform mobile apps with React Native, Supabase Realtime, and background push notifications — allowing support agents to manage visitor queues, respond to urgent queries, and monitor active chats anywhere with zero latency.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 pt-3.5 border-t border-border/60">
                    {["React Native", "Expo", "Push Notifications", "Offline Queuing", "Real-time Sync"].map((tech) => (
                      <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted/80 text-foreground/80 border border-border/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Key Takeaway / Reflection ── */}
              <div className="p-5 sm:p-8 border-l-4 border-l-primary border-t border-r border-b border-border/80 mb-8 sm:mb-12 lg:mb-14 bg-muted/30">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-primary block mb-2 sm:mb-3">
                  {isXiaChat || isHimoPay ? "Reflection" : "Key Takeaway"}
                </span>
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed max-w-2xl">{study.keyMetric}</p>
              </div>

              {/* ── Bottom CTA ── */}
              <div className="mt-auto pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 sm:gap-4 text-foreground font-bold tracking-[0.1em] uppercase text-xs sm:text-sm group"
                  >
                    <span className="group-hover:text-primary transition-colors duration-300">
                      {isHimoPay ? "Launch Live Web App" : "Launch Live Project"}
                    </span>
                    <span className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-primary/90 transition-all duration-300 group-hover:translate-x-1 shadow-md shadow-primary/20">
                      <DiagonalArrowIcon />
                    </span>
                  </a>

                  {isHimoPay && study.apkDownloadUrl && (
                    <a
                      href={study.apkDownloadUrl}
                      download="HimoPay-release.apk"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#FF5E14]/40 bg-[#FF5E14]/10 text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white font-bold tracking-[0.08em] uppercase text-[11px] sm:text-xs transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Android APK</span>
                    </a>
                  )}

                  {!isHimoPay && study.githubRepo && (
                    <a
                      href={study.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold tracking-[0.1em] uppercase text-[11px] sm:text-[12px] transition-colors duration-300 group"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">GitHub Repo</span>
                    </a>
                  )}
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
