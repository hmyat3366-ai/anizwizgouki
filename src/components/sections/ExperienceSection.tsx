import { EXPERIENCES } from "../../data/experience";

/**
 * Experience section with "Bento Box" cards.
 * DRY: Previously two nearly-identical 25-line blocks. Now driven by a data array.
 */
export default function ExperienceSection() {
  return (
    <section className="w-full mt-40 flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
        <div className="max-w-xl">
          <h2 className="font-display text-[50px] md:text-[70px] uppercase font-bold leading-none mb-4 text-foreground">
            Experience
          </h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 reveal reveal-delay-200">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.number}
            className="flex flex-col bg-card border border-border rounded-[2rem] p-8 sm:p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
          >
            {/* Decorative number watermark */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="font-display text-8xl font-bold">{exp.number}</span>
            </div>

            {/* Content */}
            <div className="flex-1 relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">
                {exp.dateRange}
              </span>
              <h3 className="font-display text-3xl md:text-4xl lg:text-[45px] leading-tight uppercase font-bold text-foreground mb-3">
                {exp.title}
              </h3>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase rounded-full mb-8">
                {exp.badge}
              </span>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
                {exp.description}
              </p>
            </div>

            {/* Project logos footer */}
            <div className="mt-auto pt-8 border-t border-border/50 relative z-10">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-6 block">
                {exp.footerLabel}
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                {exp.projectLogos.map((logo) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    className="h-12 w-auto object-contain bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-border transition-transform hover:scale-110"
                    alt={logo.alt}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
