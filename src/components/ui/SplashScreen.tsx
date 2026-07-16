import { useEffect, useState } from "react";
import { asset } from "../../lib/asset";

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

    // Simulate loading progress over ~3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // 1% every 30ms = 3 seconds total
      });
    }, 30);

    // Hide splash screen after 3.8 seconds
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = "";
    }, 3800);

    // Completely remove from DOM after fade out transition (1s)
    const removeTimeout = setTimeout(() => {
      setIsRemoved(true);
    }, 4800);

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
        isHiding ? "opacity-0 scale-105 pointer-events-none blur-sm" : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* Premium Ambient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none transition-all duration-[2000ms] ease-out ${
        isMounted && !isHiding ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`} />

      <div className="flex flex-col items-center relative z-10">
        {/* Glassmorphic Logo Container */}
        <div 
          className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full p-2 border border-gray-200/50 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            isMounted && !isHiding ? "translate-y-0 opacity-100 scale-100 rotate-0" : "translate-y-12 opacity-0 scale-75 -rotate-12"
          }`}
        >
          {/* Subtle spinning dashed ring for a tech/premium feel */}
          <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
          
          <div className="w-full h-full rounded-full overflow-hidden relative bg-background">
            <img 
              src={asset("logo.png")} 
              alt="Aniz Wiz Gouki" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
            {/* Liquid shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full" />
          </div>
        </div>

        {/* Minimalist Name */}
        <h1 
          className={`mt-10 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-foreground transition-all duration-1000 delay-300 ${
            isMounted && !isHiding ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Aniz Wiz Gouki
        </h1>

        {/* Elegant Counter & Micro Bar */}
        <div 
          className={`mt-6 flex flex-col items-center gap-4 transition-all duration-1000 delay-500 ${
            isMounted && !isHiding ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-mono text-[10px] sm:text-xs font-medium tracking-widest text-muted-foreground">
            {progress.toString().padStart(3, "0")}%
          </span>
          <div className="w-16 sm:w-24 h-[1px] bg-border relative overflow-hidden rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear shadow-[0_0_8px_var(--primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
