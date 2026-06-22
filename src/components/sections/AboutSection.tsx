import MagicText from "../MagicText";
import { ABOUT_STATS } from "../../data/navigation";

/** About section with bio, stats grid, and morphing image placeholder. */
export default function AboutSection() {
  return (
    <section id="about-section" className="w-full mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
      <div className="flex flex-col order-2 lg:order-1 reveal">
        <h2 className="font-display text-[50px] md:text-[70px] uppercase font-bold leading-none mb-6 text-foreground">
          About Me
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl leading-relaxed text-lg">
          Hi, I'm <MagicText /> — an aspiring UX/UI designer. Having recently completed a design internship, I'm passionate about learning, iterating, and building meaningful digital products.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label}>
              <h3 className="font-display text-4xl md:text-5xl text-primary font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-800 dark:text-gray-400 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center order-1 lg:order-2 pointer-events-none">
        <div id="about-placeholder" className="img-placeholder w-4/5 md:w-2/3 lg:w-4/5 aspect-[4/5]" />
      </div>
    </section>
  );
}
