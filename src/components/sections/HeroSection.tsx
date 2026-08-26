import { MorphingText } from "../ui/liquid-text";
import { FloatingPaths } from "../ui/background-paths";

/** Hero section with animated name, role title, and floating paths background. */
export default function HeroSection() {
  return (
    <section id="home" className="w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-center relative py-4 sm:py-8">
      {/* Floating animated paths background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, white 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 50%, transparent 100%)",
        }}
      >
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-center w-full max-w-[1500px] relative z-10 mx-auto px-2 sm:px-4">
        {/* Left: Name + Role Title */}
        <div className="justify-self-center lg:justify-self-end flex flex-col items-center lg:items-end text-center lg:text-right mt-4 sm:mt-8 lg:mt-0 lg:pt-16 reveal hero-parallax w-full relative">
          <span className="text-[11px] sm:text-xs md:text-sm tracking-[0.15em] font-semibold uppercase mb-2 sm:mb-3 text-gray-800 dark:text-gray-300 ml-1 lg:ml-auto w-full">
            Aniz Wiz Gouki
          </span>
          <div className="w-full flex justify-center lg:justify-end relative h-[52px] sm:h-[80px] md:h-[100px] lg:h-[70px] xl:h-[90px] 2xl:h-[120px]" dir="rtl">
            <MorphingText
              texts={["UI/UX", "AI PRODUCT"]}
              className="font-display text-[clamp(2.1rem,7.8vw,2.6rem)] sm:text-[60px] md:text-[72px] lg:text-[50px] xl:text-[62px] 2xl:text-[90px] leading-none font-bold text-foreground uppercase tracking-tighter w-full absolute left-0 top-0 h-full !mx-0 text-center lg:text-right whitespace-nowrap px-1"
            />
          </div>
          {/* Invisible spacer to balance right column height */}
          <p className="hidden lg:block max-w-[280px] text-sm sm:text-base mt-6 leading-relaxed font-medium lg:mr-1 invisible opacity-0 select-none pointer-events-none" aria-hidden="true">
            I turn messy problems into clean, production-ready interfaces — from Figma to code.
          </p>
          <div className="hidden lg:flex mt-8 gap-4 invisible opacity-0 select-none pointer-events-none" aria-hidden="true">
            <div className="px-6 py-3 rounded-full text-sm">View My Work</div>
          </div>
        </div>

        {/* Center: Image Placeholder (driven by MagicalImage) */}
        <div className="relative w-[76vw] sm:w-[80vw] max-w-[270px] sm:max-w-[380px] lg:w-[380px] xl:w-[460px] mx-auto z-10 order-first lg:order-none mt-6 sm:mt-12 lg:mt-0">
          <div id="hero-placeholder" className="img-placeholder aspect-[3/4] w-full" />
        </div>

        {/* Right: Role Title + Intro */}
        <div className="justify-self-center lg:justify-self-start flex flex-col items-center lg:items-start text-center lg:text-left -mt-2 sm:mt-0 lg:mt-0 lg:pt-16 reveal hero-parallax w-full relative overflow-visible">
          <span className="hidden lg:block text-xs md:text-sm tracking-[0.15em] font-semibold uppercase mb-3 invisible opacity-0 select-none pointer-events-none w-full" aria-hidden="true">
            Spacer
          </span>
          <div className="w-full flex justify-center lg:justify-start relative h-[52px] sm:h-[80px] md:h-[100px] lg:h-[70px] xl:h-[90px] 2xl:h-[120px]">
            <MorphingText
              texts={["DESIGNER", "DESIGNER"]}
              className="font-display text-[clamp(2.4rem,9.2vw,3rem)] sm:text-[70px] md:text-[85px] lg:text-[60px] xl:text-[75px] 2xl:text-[110px] leading-none font-bold text-foreground uppercase tracking-tighter w-full absolute left-0 top-0 h-full !mx-0 text-center lg:text-left whitespace-nowrap px-1"
            />
          </div>
          <p className="max-w-[280px] sm:max-w-[320px] text-muted-foreground text-xs sm:text-sm md:text-base mt-4 sm:mt-6 leading-relaxed font-medium lg:ml-1 px-2 sm:px-0">
            I turn messy problems into clean, production-ready interfaces — from Figma to code.
          </p>
          <div className="mt-6 sm:mt-8 flex gap-4 lg:ml-1">
            <button 
              onClick={() => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:scale-105 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-10">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-muted-foreground/60">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-muted-foreground/60 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
