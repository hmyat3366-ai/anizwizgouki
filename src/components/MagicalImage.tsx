import { useEffect, useRef } from "react";
import { asset } from "../lib/asset";

/**
 * The floating 3D flip card that morphs across sections via GSAP.
 * Optimizations:
 *  - Hero image fetchpriority="high" and decoding="async" for instant LCP
 *  - Smart video playback management: video pauses when offscreen or backface is hidden,
 *    resuming smoothly when the user scrolls to the Skills section
 *  - Tab visibility awareness (pauses video when tab is in background)
 */
export default function MagicalImage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Observe when the skills section is visible to toggle video decoding
    const servicesSection = document.getElementById("services-section");
    if (!servicesSection) return;

    let isSectionVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
        if (isSectionVisible && document.visibilityState === "visible") {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(servicesSection);

    // Pause playback when browser tab is inactive to preserve CPU & battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isSectionVisible) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      id="magical-image-container"
      className="absolute top-0 left-0 z-20 origin-center pointer-events-none will-change-transform"
      style={{ perspective: "1500px" }}
    >
      <div
        id="magical-image-inner"
        className="w-full h-full rounded-[2rem] xl:rounded-[2.5rem] shadow-2xl relative will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (Hero Image) */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <img
            src={asset("12.jpg")}
            alt="Aniz Wiz Gouki Portrait"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-top rounded-[2rem] xl:rounded-[2.5rem] bg-gray-200 dark:bg-gray-800"
            id="magical-img-src"
          />

          {/* Animated "Hi 👋" badge */}
          <div
            id="hero-badge"
            className="group absolute -bottom-8 -left-3 sm:-bottom-12 sm:-left-10 bg-primary text-background rounded-full w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center shadow-xl border-[4px] sm:border-[6px] border-[#fafafa] dark:border-[#121212] animate-float z-30 cursor-pointer overflow-hidden pointer-events-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center animate-swap-hi">
              <span className="font-display text-3xl sm:text-5xl font-bold">Hi</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-swap-hand">
              <span className="text-3xl sm:text-5xl animate-wave inline-block">👋</span>
            </div>
          </div>

          {/* Scroll progress indicator dots */}
          <div id="services-dot" className="absolute right-4 lg:right-10 top-1/2 w-4 h-4 bg-primary rounded-full shadow-lg opacity-0 transition-opacity duration-300" />
          <div id="about-dot" className="absolute left-4 lg:-left-4 bottom-1/3 w-4 h-4 bg-primary rounded-full shadow-lg opacity-0 transition-opacity duration-300" />
        </div>

        {/* Back Face (Skills Video) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <video
            ref={videoRef}
            src={asset("Designing_website_development_wo…_202608261117.mp4")}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center rounded-[2rem] xl:rounded-[2.5rem] bg-gray-200 dark:bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
