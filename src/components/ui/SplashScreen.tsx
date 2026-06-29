import { useEffect, useState } from "react";
import { MorphingText } from "./liquid-text";

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Trigger enter animation slightly after mount for smooth transition
    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    // Simulate loading progress over ~4 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // 1% every 40ms = 4 seconds total
      });
    }, 40);

    // Hide splash screen after 4.5 seconds (giving time for the morph text animation)
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      // Re-enable scroll when starting to hide
      document.body.style.overflow = "";
    }, 4500);

    // Completely remove from DOM after fade out transition (700ms)
    const removeTimeout = setTimeout(() => {
      setIsRemoved(true);
    }, 5200);

    return () => {
      document.body.style.overflow = "";
      clearInterval(progressInterval);
      clearTimeout(mountTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        isHiding ? "opacity-0 -translate-y-10 scale-105 pointer-events-none" : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      <div className="flex flex-col items-center relative z-10">
        
        {/* Animated Title */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest uppercase flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden drop-shadow-xl">
          {["Aniz", "Wiz", "Gouki"].map((word, i) => (
            <span 
              key={word} 
              className={`transform transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                isMounted && !isHiding 
                  ? "translate-y-0 opacity-100 blur-0 scale-100" 
                  : "translate-y-12 opacity-0 blur-md scale-95"
              }`}
              style={{ transitionDelay: `${i * 150 + 100}ms` }}
            >
              {word === "Wiz" ? (
                <span className="text-primary relative inline-block">
                  {word}
                  {/* Small glowing dot on Wiz */}
                  <span className="absolute -right-2 top-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
                  <span className="absolute -right-2 top-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>
        
        <div className={`mt-6 w-full flex justify-center transition-all duration-1000 ease-out delay-700 ${
          isMounted && !isHiding ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <MorphingText 
            texts={["JUNIOR UI/UX DESIGNER", "AI PRODUCT DESIGNER"]} 
            className="!h-8 md:!h-10 !text-xs sm:!text-sm md:!text-base text-muted-foreground uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium !leading-none"
          />
        </div>

        <div className={`mt-12 w-56 md:w-72 h-[2px] bg-border relative overflow-hidden rounded-full transition-all duration-1000 ease-out delay-[900ms] ${
          isMounted && !isHiding ? "opacity-100 scale-100" : "opacity-0 scale-x-0"
        }`}>
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 transition-all duration-75 ease-linear rounded-full shadow-[0_0_8px_var(--primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Optional ambient background glows */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 delay-500 ${
        isMounted && !isHiding ? "opacity-100" : "opacity-0"
      }`} />
    </div>
  );
}
