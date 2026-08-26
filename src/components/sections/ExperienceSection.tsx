import { EXPERIENCES } from "../../data/experience";

/**
 * Experience section with a balanced 2-card Bento Grid layout.
 */
export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full mt-20 md:mt-40 flex flex-col items-center">
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 sm:gap-6 reveal">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3 sm:mb-4 block">
            CAREER JOURNEY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[70px] uppercase font-bold leading-none mb-4 text-foreground">
            Experience
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mt-2 sm:mt-4">
            A timeline of my design internships and AI-assisted frontend development.
          </p>
        </div>
      </div>

      {/* 2-Column Bento Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 reveal reveal-delay-200">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.number}
            className="bg-card border border-border rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 group relative overflow-hidden"
          >
            {/* Decorative Watermark Number */}
            <span className="absolute -top-3 -right-2 opacity-[0.06] dark:opacity-[0.08] font-display text-7xl sm:text-9xl md:text-[130px] font-extrabold leading-none pointer-events-none select-none text-foreground group-hover:opacity-15 transition-opacity duration-500">
              {exp.number}
            </span>

            {/* Content */}
            <div className="relative z-10 mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {exp.dateRange}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 bg-primary/10 text-primary font-bold text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full">
                  {exp.badge}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-3xl md:text-4xl uppercase font-bold text-foreground mb-4 sm:mb-6 group-hover:text-primary transition-colors">
                {exp.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-xs sm:text-base md:text-lg">
                {exp.description}
              </p>
            </div>

            {/* Project Logos Footer */}
            <div className="relative z-10 pt-5 sm:pt-6 border-t border-border/60 mt-auto">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                {exp.footerLabel}
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {exp.projectLogos.map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex items-center gap-2 sm:gap-2.5 bg-muted/80 dark:bg-muted/40 border border-border/80 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 hover:border-primary/50 transition-all hover:scale-105 group/item"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden bg-white dark:bg-gray-900 border border-border/50 flex items-center justify-center p-1 shrink-0">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-foreground/80 group-hover/item:text-foreground">
                      {logo.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
