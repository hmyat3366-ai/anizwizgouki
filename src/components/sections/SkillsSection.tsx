import { SKILLS } from "../../data/skills";

/** Skills section with accordion items and a sticky image placeholder for the morphing card. */
export default function SkillsSection() {
  return (
    <section id="services-section" className="w-full mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative min-h-0 lg:min-h-[70vh]">
      {/* Left: Title + Accordion */}
      <div className="flex flex-col reveal text-block-parallax">
        <h2 className="font-display text-4xl sm:text-5xl md:text-[70px] uppercase font-bold leading-none mb-4 sm:mb-6 text-foreground">
          My Core Skills
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-10 max-w-lg leading-relaxed">
          From research to code — I own the full design lifecycle, ensuring every decision is grounded in user needs and business goals.
        </p>

        <div className="flex flex-col border-t border-border transition-colors">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="accordion-item py-5 sm:py-6 border-b border-border flex flex-col cursor-pointer group gap-2"
              data-image={skill.imageUrl}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-display text-xl sm:text-2xl md:text-3xl uppercase group-hover:text-primary transition-colors">
                  {skill.label}
                </span>
                <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase group-hover:text-primary transition-colors">+</span>
              </div>
              {skill.desc && (
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 mt-1 sm:-mt-1">
                  {skill.desc}
                </p>
              )}
              {skill.tools && (
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-primary/80 lg:text-primary/70 opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  {skill.tools}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sticky placeholder for the morphing image (desktop only) */}
      <div className="hidden lg:flex sticky top-32 w-full h-full min-h-[500px] items-center justify-center pointer-events-none">
        <div id="services-placeholder" className="img-placeholder w-4/5 aspect-[4/5]" />
      </div>
    </section>
  );
}
