import { MorphingText } from "../ui/liquid-text";
import { TheInfiniteGrid } from "../ui/the-infinite-grid";

/** Hero section with animated name, role title, and the infinite grid background. */
export default function HeroSection() {
  return (
    <section id="home" className="w-full min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-center relative">
      {/* Faded background grid */}
      <div
        className="absolute top-[-100px] left-0 w-[100vw] h-[100vh] -z-10 max-w-[100vw] overflow-hidden !ml-[calc(-50vw+50%)]"
        style={{
          maskImage: "linear-gradient(to bottom, white 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 60%, transparent 100%)",
        }}
      >
        <TheInfiniteGrid />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-12 xl:gap-16 items-center w-full max-w-[1500px] relative z-10 mx-auto">
        {/* Left: Name + Role Title */}
        <div className="justify-self-center lg:justify-self-end flex flex-col items-center lg:items-end text-center lg:text-right mt-8 lg:mt-0 lg:pt-16 reveal hero-parallax w-full relative">
          <span className="text-xs md:text-sm tracking-[0.15em] font-semibold uppercase mb-3 text-gray-800 dark:text-gray-300 ml-1 lg:ml-auto w-full">
            Aniz Wiz Gouki
          </span>
          <div className="w-full flex justify-center lg:justify-end relative h-[60px] sm:h-[100px] md:h-[120px] lg:h-[80px] xl:h-[110px] 2xl:h-[150px]" dir="rtl">
            <MorphingText
              texts={["JR.UI/UX", "AI PRODUCT"]}
              className="font-display text-[50px] sm:text-[80px] md:text-[100px] lg:text-[70px] xl:text-[90px] 2xl:text-[130px] leading-none font-bold text-foreground uppercase tracking-tighter w-full absolute left-0 top-0 h-full !mx-0 text-center lg:text-right whitespace-nowrap px-2"
            />
          </div>
          {/* Invisible spacer to balance the right column's paragraph */}
          <p className="hidden lg:block max-w-[280px] text-sm sm:text-base mt-6 leading-relaxed font-medium lg:mr-1 invisible opacity-0 select-none pointer-events-none" aria-hidden="true">
            I'm a passionate Jr. UI/UX & AI Product Designer, eager to craft user-centered experiences from design to code.
          </p>
        </div>

        {/* Center: Image Placeholder (driven by MagicalImage) */}
        <div className="relative w-[80vw] max-w-[300px] sm:max-w-[400px] lg:w-[400px] xl:w-[460px] mx-auto z-10 order-first lg:order-none mt-12 lg:mt-0">
          <div id="hero-placeholder" className="img-placeholder aspect-[3/4] w-full" />
        </div>

        {/* Right: Role Title + Intro */}
        <div className="justify-self-center lg:justify-self-start flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0 lg:pt-16 reveal hero-parallax w-full relative overflow-visible">
          <span className="hidden lg:block text-xs md:text-sm tracking-[0.15em] font-semibold uppercase mb-3 invisible opacity-0 select-none pointer-events-none w-full" aria-hidden="true">
            Spacer
          </span>
          <div className="w-full flex justify-center lg:justify-start relative h-[60px] sm:h-[100px] md:h-[120px] lg:h-[80px] xl:h-[110px] 2xl:h-[150px]">
            <MorphingText
              texts={["DESIGNER", "DESIGNER"]}
              className="font-display text-[50px] sm:text-[80px] md:text-[100px] lg:text-[70px] xl:text-[90px] 2xl:text-[130px] leading-none font-bold text-foreground uppercase tracking-tighter w-full absolute left-0 top-0 h-full !mx-0 text-center lg:text-left whitespace-nowrap px-2"
            />
          </div>
          <p className="max-w-[280px] text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed font-medium lg:ml-1">
            I'm a passionate Jr. UI/UX & AI Product Designer, eager to craft user-centered experiences from design to code.
          </p>
        </div>
      </div>
    </section>
  );
}
