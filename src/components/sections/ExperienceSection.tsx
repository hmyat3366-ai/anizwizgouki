import { GraduationCap, Calendar, Users, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { EXPERIENCES } from "../../data/experience";

interface ExperienceSectionProps {
  onOpenStudy?: (slug: string) => void;
}

/**
 * Featured Bento Card for Experience Section.
 * Elegantly presents the comprehensive School Internship experience and its 3 student deliverables:
 * Aura Real Estate, DMAR App, and Skyline Agency.
 */
export default function ExperienceSection({ onOpenStudy }: ExperienceSectionProps) {
  const exp = EXPERIENCES[0];

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
            Practical UI/UX design experience gained through academic collaboration and client-oriented school internship projects.
          </p>
        </div>
      </div>

      {/* Featured Single-Card Bento Grid */}
      <div className="w-full reveal reveal-delay-200">
        <div className="w-full bg-card border border-border/80 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] transition-all duration-700 group">
          {/* Decorative Watermark Number */}
          <span className="absolute -top-4 -right-2 opacity-[0.04] dark:opacity-[0.06] font-display text-8xl sm:text-[160px] md:text-[210px] font-black leading-none pointer-events-none select-none text-foreground group-hover:opacity-10 transition-opacity duration-700">
            {exp.number}
          </span>

          {/* Ambient Lighting Accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Internal 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10 items-stretch">
            {/* Left Column: Internship Overview & Core Responsibilities */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                {/* Meta Header Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted/80 border border-border/70 rounded-full text-[11px] font-semibold text-muted-foreground">
                    <Calendar size={13} className="text-primary" />
                    <span>{exp.dateRange}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-primary/10 border border-primary/25 text-primary rounded-full text-[11px] font-bold tracking-wider uppercase">
                    <GraduationCap size={14} />
                    <span>{exp.badge}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted/50 border border-border/50 text-muted-foreground rounded-full text-[11px] font-medium">
                    <Users size={12} />
                    <span>Team Collaboration</span>
                  </div>
                </div>

                {/* Role Title & Institution */}
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-foreground leading-[1.05] tracking-tight group-hover:text-primary transition-colors mb-2">
                  {exp.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-primary/90 mb-6">
                  {exp.institution}
                </p>

                {/* Narrative Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  {exp.description}
                </p>

                {/* Core Responsibilities */}
                {exp.responsibilities && (
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Core Responsibilities &amp; Learnings
                    </div>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Outcome Card */}
              {exp.keyTakeaway && (
                <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                    <Sparkles size={14} className="text-primary" />
                    <span>Internship Milestone</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {exp.keyTakeaway}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: 3 School Internship Projects Showcase */}
            <div className="lg:col-span-7 flex flex-col justify-between pt-4 lg:pt-0 lg:border-l lg:border-border/60 lg:pl-10 xl:pl-14">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    INTERNSHIP DELIVERABLES (3 PROJECTS)
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-primary px-3 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                    School Curriculum
                  </span>
                </div>

                <h4 className="font-display text-xl sm:text-2xl uppercase font-bold text-foreground mb-2">
                  School Internship Projects
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                  Key client &amp; product designs engineered collaboratively during the internship term:
                </p>

                {/* 3 Project Cards */}
                <div className="space-y-4">
                  {exp.projects?.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        if (onOpenStudy) {
                          onOpenStudy(project.id);
                        } else {
                          const el = document.getElementById("project");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (onOpenStudy) onOpenStudy(project.id);
                        }
                      }}
                      className="bg-muted/40 dark:bg-muted/20 hover:bg-muted/80 border border-border/70 hover:border-primary/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group/project cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                        {/* Logo Container */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-border/60 flex items-center justify-center p-2 shrink-0 shadow-sm group-hover/project:scale-105 transition-transform duration-300">
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h5 className="font-display text-base sm:text-lg font-bold uppercase text-foreground group-hover/project:text-primary transition-colors">
                              {project.title}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                              {project.timeline}
                            </span>
                          </div>

                          <p className="text-[11px] sm:text-xs font-semibold text-foreground/80 mb-1.5">
                            {project.role} <span className="text-muted-foreground font-normal">• {project.category}</span>
                          </p>

                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                            {project.description}
                          </p>

                          {/* Deliverable Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-background/80 border border-border/60 text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Arrow Action Button */}
                      <div className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground group-hover/project:text-primary group-hover/project:border-primary/50 group-hover/project:bg-primary/10 transition-colors shrink-0 self-end sm:self-center">
                        <ArrowUpRight size={17} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Note & Quick Link */}
              <div className="mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <span>* Group projects designed during the school internship with peer collaboration.</span>
                <a
                  href="#project"
                  className="text-primary hover:underline font-bold flex items-center gap-1 self-start sm:self-auto"
                >
                  Explore All Case Studies &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
