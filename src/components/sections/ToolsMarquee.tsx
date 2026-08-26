import { TOOLS } from "../../data/tools";

/** Infinite horizontal scrolling marquee showing all design tools. */
export default function ToolsMarquee() {
  return (
    <section className="w-[100vw] relative left-1/2 -translate-x-1/2 my-16 md:my-24 overflow-hidden bg-foreground text-background py-4 sm:py-6 border-y border-transparent dark:border-gray-200 -rotate-2 shadow-2xl z-10">
      <div className="marquee-parallax-wrapper">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(6)
            .fill(TOOLS)
            .flat()
            .map((item, index) => (
              <span
                key={`${item.name}-${index}`}
                className="mx-4 sm:mx-6 text-base sm:text-xl md:text-2xl font-display font-bold tracking-widest uppercase flex items-center gap-2"
              >
                <item.Icon /> {item.name}{" "}
                <span className="mx-4 sm:mx-6 opacity-40 text-primary">•</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
