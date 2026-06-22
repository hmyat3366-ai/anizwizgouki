import { SKILLS } from "../../data/skills";

/** Skills section with accordion items and a sticky image placeholder for the morphing card. */
export default function SkillsSection() {
  return (
    <section id="services-section" className="w-full mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative min-h-[70vh]">
      {/* Left: Title + Accordion */}
      <div className="flex flex-col reveal text-block-parallax">
        <h2 className="font-display text-[50px] md:text-[70px] uppercase font-bold leading-none mb-6 text-foreground">
          My Core Skills
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg leading-relaxed">
          I focus on understanding user needs and translating them into intuitive, visually appealing digital solutions.
        </p>

        <div className="flex flex-col border-t border-border transition-colors">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="accordion-item py-6 border-b border-border flex justify-between items-center cursor-pointer group"
              data-image={skill.imageUrl}
            >
              <span className="font-display text-2xl md:text-3xl uppercase group-hover:text-primary transition-colors">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sticky placeholder for the morphing image */}
      <div className="sticky top-32 w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center pointer-events-none">
        <div id="services-placeholder" className="img-placeholder w-4/5 md:w-2/3 lg:w-4/5 aspect-[4/5]" />
      </div>
    </section>
  );
}
