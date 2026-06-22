import { TOOLS } from "../../data/tools";

/** Infinite horizontal scrolling marquee showing all design tools. */
export default function ToolsMarquee() {
  return (
    <section className="w-[110vw] relative left-1/2 -translate-x-1/2 mt-24 mb-24 overflow-hidden bg-foreground text-background py-6 border-y border-transparent dark:border-gray-200 -rotate-2 shadow-2xl z-10">
      <div className="marquee-parallax-wrapper">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(6)
            .fill(TOOLS)
            .flat()
            .map((item, index) => (
              <span
                key={index}
                className="mx-6 text-xl md:text-2xl font-display font-bold tracking-widest uppercase flex items-center"
              >
                <item.Icon /> {item.name}{" "}
                <span className="mx-6 opacity-30 text-lime-400 dark:text-indigo-600">•</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
