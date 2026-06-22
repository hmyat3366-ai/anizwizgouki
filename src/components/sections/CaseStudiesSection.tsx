import { CASE_STUDIES, CASE_STUDY_ORDER, CASE_STUDY_STACK_CONFIG } from "../../data/case-studies";

interface Props {
  onOpenStudy: (slug: string) => void;
}

export default function CaseStudiesSection({ onOpenStudy }: Props) {
  return (
    <section id="project" className="w-full mt-40 flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
        <div className="max-w-xl">
          <h2 className="font-display text-[50px] md:text-[70px] uppercase font-bold leading-none mb-4 text-foreground">Selected Case Studies</h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-12 relative min-h-[200vh]">
        {CASE_STUDY_ORDER.map((slug, i) => {
          const s = CASE_STUDIES[slug];
          const c = CASE_STUDY_STACK_CONFIG[i];
          return (
            <div key={s.id} onClick={() => onOpenStudy(slug)} role="button" tabIndex={0}
              className={`block case-study-item sticky ${c.topOffset} w-full min-h-[500px] lg:aspect-[21/9] bg-card rounded-[2rem] sm:rounded-[3rem] overflow-hidden group cursor-none shadow-xl reveal border border-border ${c.zIndex} grid grid-cols-1 lg:grid-cols-2`}>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-muted order-2 lg:order-1 transition-colors">
                <div className="flex justify-between items-start w-full">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase rounded-full mb-6">{s.tag}</span>
                  <span className="text-muted-foreground font-bold font-display text-lg">[ {s.year} ]</span>
                </div>
                <div className="mb-8 md:mb-0">
                  <h3 className="font-display text-5xl lg:text-7xl xl:text-[80px] text-foreground font-bold leading-[0.9] uppercase mb-6">{s.title.replace(" ", "\n").split("\n").map((w, j) => <span key={j}>{w}{j === 0 && <br/>}</span>)}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">{s.desc}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-muted-foreground mt-8 md:mt-0">
                  {s.roles.map((r, j) => (<span key={r}>{j > 0 && <span className="text-primary mr-3">•</span>}{r}</span>))}
                </div>
              </div>
              <div className="w-full h-[300px] lg:h-full relative overflow-hidden order-1 lg:order-2">
                <img src={s.image} loading="lazy" className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${s.id === "dmar" ? "object-top bg-secondary" : ""}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
