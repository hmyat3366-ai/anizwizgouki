import { asset } from "../lib/asset";

/** The floating 3D flip card that morphs across sections via GSAP. */
export default function MagicalImage() {
  return (
    <div
      id="magical-image-container"
      className="absolute top-0 left-0 z-20 origin-center pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      <div
        id="magical-image-inner"
        className="w-full h-full rounded-[2rem] xl:rounded-[2.5rem] shadow-2xl relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (Hero Image) */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <img
            src={asset("12.jpg")}
            className="w-full h-full object-cover object-top rounded-[2rem] xl:rounded-[2.5rem] bg-gray-200 dark:bg-gray-800"
            id="magical-img-src"
          />

          {/* Animated "Hi 👋" badge */}
          <div
            id="hero-badge"
            className="group absolute -bottom-10 -left-6 sm:-bottom-12 sm:-left-12 bg-primary text-background rounded-full w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shadow-xl border-[6px] border-[#fafafa] dark:border-[#121212] animate-float z-30 cursor-pointer overflow-hidden pointer-events-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center animate-swap-hi">
              <span className="font-display text-4xl sm:text-5xl font-bold">Hi</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-swap-hand">
              <span className="text-4xl sm:text-5xl animate-wave inline-block">👋</span>
            </div>
          </div>

          {/* Scroll progress indicator dots */}
          <div id="services-dot" className="absolute right-4 lg:right-10 top-1/2 w-4 h-4 bg-primary rounded-full shadow-lg opacity-0 transition-opacity duration-300" />
          <div id="about-dot" className="absolute left-4 lg:-left-4 bottom-1/3 w-4 h-4 bg-primary rounded-full shadow-lg opacity-0 transition-opacity duration-300" />
        </div>

        {/* Back Face (Skills Image) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={asset("User Research.jpg")}
            className="w-full h-full object-cover object-center rounded-[2rem] xl:rounded-[2.5rem] bg-gray-200 dark:bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
