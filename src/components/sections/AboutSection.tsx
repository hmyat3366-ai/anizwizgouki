import { Download, ArrowUpRight, CheckCircle2 } from "lucide-react";
import MagicText from "../MagicText";
import { ABOUT_STATS } from "../../data/navigation";
import { asset } from "../../lib/asset";

/**
 * AboutSection component.
 * Positioned right below HeroSection, featuring:
 * - Left column: Photo placeholder (#about-placeholder) that receives the morphing portrait on scroll from Hero
 * - Right column: Biography narrative, core design pillars, stats, and [Download Resume] button
 */
export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="w-full mt-16 sm:mt-24 md:mt-32 max-w-[1500px] mx-auto px-2 sm:px-4 relative z-10 flex flex-col items-center"
    >
      {/* Featured Master Bento Card */}
      <div className="w-full bg-card border border-border/80 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] transition-all duration-700 group">
        {/* Subtle Decorative Ambient Glow & Background Watermark */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <span className="absolute -top-6 -right-2 opacity-[0.03] dark:opacity-[0.05] font-display text-8xl sm:text-[160px] md:text-[220px] font-black leading-none pointer-events-none select-none text-foreground">
          ABOUT
        </span>

        {/* 2-Column Responsive Layout: Left = Photo Placeholder; Right = Bio & Download Resume */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Photo Placeholder (Target of GSAP Scroll Morph from Hero) */}
          <div className="lg:col-span-5 flex justify-center items-center w-full order-1">
            <div className="w-[76vw] sm:w-[80vw] max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] w-full aspect-[3/4] relative">
              <div
                id="about-placeholder"
                className="img-placeholder w-full h-full rounded-[2rem] xl:rounded-[2.5rem] border border-border/40"
              />
            </div>
          </div>

          {/* Right Column: Narrative, Pillars, Stats & Download Resume */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 reveal order-2">
            <div>
              {/* Eyebrow Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  BIOGRAPHY &amp; PASSION
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="inline-block px-3 py-0.5 bg-primary/10 text-primary font-bold text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full">
                  Based in Myanmar
                </span>
                <span className="inline-block px-3 py-0.5 bg-muted/60 text-muted-foreground font-semibold text-[10px] sm:text-[11px] tracking-wider uppercase rounded-full border border-border/50">
                  Open for Opportunities
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-bold text-foreground leading-[1.05] tracking-tight mb-4 sm:mb-6">
                About Me
              </h2>

              {/* Interactive Greeting with Scramble MagicText */}
              <p className="text-foreground font-semibold text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                Hi, I'm <MagicText /> — a dedicated Junior UI/UX Designer passionate about crafting human-centered, production-ready digital products.
              </p>

              {/* Narrative Story */}
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                I bridge the gap between creative visual thinking, modular Figma design systems, and rapid AI-assisted frontend implementation. Having completed an intensive school internship along with 5 end-to-end case studies (including fintech apps, omnichannel support platforms, and responsive web portals), I focus on solving user problems with clarity, elegance, and pixel precision.
              </p>

              {/* Core Pillars / Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                <div className="p-3 sm:p-3.5 rounded-xl bg-muted/40 border border-border/60">
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                    <CheckCircle2 size={13} />
                    <span>RESEARCH</span>
                  </div>
                  <p className="text-xs font-bold text-foreground">User Journeys &amp; Wireframes</p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-muted/40 border border-border/60">
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                    <CheckCircle2 size={13} />
                    <span>SYSTEMS</span>
                  </div>
                  <p className="text-xs font-bold text-foreground">Figma Tokens &amp; Auto-Layout</p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-muted/40 border border-border/60">
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                    <CheckCircle2 size={13} />
                    <span>FRONTEND</span>
                  </div>
                  <p className="text-xs font-bold text-foreground">Design-To-Code Execution</p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Stats & Download Resume Button */}
            <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Quick Stats Grid */}
              <div className="flex items-center gap-6 sm:gap-8">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label}>
                    <h3 className="font-display text-2xl sm:text-3xl text-primary font-bold mb-0.5">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions: Download Resume CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={asset("Gouki_Portfolio_Projects_Documentation.pdf")}
                  download="Gouki_Resume_Portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/25 group shrink-0"
                >
                  <Download size={17} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </a>

                <a
                  href="#project"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
                >
                  <span>View Projects</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
