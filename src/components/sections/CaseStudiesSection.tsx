import { CASE_STUDIES, CASE_STUDY_ORDER, CASE_STUDY_STACK_CONFIG } from "../../data/case-studies";

interface Props {
  onOpenStudy: (slug: string) => void;
}

export default function CaseStudiesSection({ onOpenStudy }: Props) {
  return (
    <section id="project" className="w-full mt-20 md:mt-40 flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 sm:gap-6 reveal">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3 sm:mb-4 block">
            {CASE_STUDY_ORDER.length} Projects
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[70px] uppercase font-bold leading-none mb-4 text-foreground">Selected Work</h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mt-2 sm:mt-4">
            End-to-end projects — from research &amp; Figma to shipped, production-ready code.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 sm:gap-12 relative min-h-[220vh] sm:min-h-[260vh]">
        {CASE_STUDY_ORDER.map((slug, i) => {
          const s = CASE_STUDIES[slug];
          const c = CASE_STUDY_STACK_CONFIG[i];
          return (
            <div key={s.id} onClick={() => onOpenStudy(slug)} role="button" tabIndex={0}
              className={`block case-study-item sticky ${c.topOffset} w-full min-h-[440px] sm:min-h-[500px] lg:aspect-[21/9] bg-card rounded-[1.75rem] sm:rounded-[3rem] overflow-hidden group cursor-pointer lg:cursor-none shadow-xl reveal border border-border ${c.zIndex} grid grid-cols-1 lg:grid-cols-2`}>
              <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-muted order-2 lg:order-1 transition-colors">
                <div className="flex justify-between items-start w-full">
                  <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 bg-primary/10 text-primary font-bold text-[9px] sm:text-[10px] tracking-widest uppercase rounded-full mb-4 sm:mb-6">{s.tag}</span>
                  <span className="text-muted-foreground font-bold font-display text-base sm:text-lg">[ {s.year} ]</span>
                </div>
                <div className="mb-6 md:mb-0">
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-7xl xl:text-[80px] text-foreground font-bold leading-[0.92] uppercase mb-4 sm:mb-6 group-hover:text-primary transition-colors">{s.title.replace(" ", "\n").split("\n").map((w, j) => <span key={j}>{w}{j === 0 && <br/>}</span>)}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-sm">{s.desc}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-xs font-bold tracking-widest uppercase text-muted-foreground mt-6 md:mt-0">
                  {s.roles.map((r, j) => (<span key={r}>{j > 0 && <span className="text-primary mr-2 sm:mr-3">•</span>}{r}</span>))}
                </div>
              </div>
              <div className="w-full h-[220px] sm:h-[300px] lg:h-full relative overflow-hidden order-1 lg:order-2">
                <img src={s.image} loading="lazy" alt={s.title} className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 ${s.id === "dmar" ? "object-cover object-top bg-secondary" : s.id === "xiachat" ? "object-contain p-6 sm:p-10 bg-white" : "object-cover"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
