import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isHiding, setIsHiding] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5; // increment by 5% every 50ms
      });
    }, 50);

    // Hide splash screen after 1.5 seconds
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      // Re-enable scroll when starting to hide
      document.body.style.overflow = "";
    }, 1500);

    // Completely remove from DOM after fade out transition (700ms)
    const removeTimeout = setTimeout(() => {
      setIsRemoved(true);
    }, 2200);

    return () => {
      document.body.style.overflow = "";
      clearInterval(progressInterval);
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
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground uppercase flex items-center gap-2">
          H<span className="text-primary animate-pulse">u</span>ge
        </h1>
        
        <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest font-medium">
          AI Product Designer
        </p>

        <div className="mt-10 w-48 md:w-64 h-[2px] bg-border relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Optional ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
