import { SKILLS } from "../../data/skills";
import { asset } from "../../lib/asset";

/**
 * Skills section with interactive accordion items and a showcase video of the design & development workflow.
 */
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

      {/* Right / Bottom: Design & Development Workflow Video Showcase */}
      <div className="flex w-full items-center justify-center mt-10 lg:mt-0 lg:sticky lg:top-32 lg:h-full lg:min-h-[500px]">
        <div className="w-[76vw] sm:w-[80vw] max-w-[270px] sm:max-w-[380px] lg:w-4/5 aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] xl:rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/80 bg-card relative group">
          <video
            src={asset("Designing_website_development_wo…_202608261117.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center rounded-[2rem] xl:rounded-[2.5rem] bg-gray-200 dark:bg-gray-800"
          />
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 text-[11px] font-semibold text-foreground flex items-center justify-between">
            <span>Workflow &amp; Code Execution</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
