import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Returns true if current time should be dark mode (12:00 PM – 11:59 PM). */
function shouldBeDark(): boolean {
  const hour = new Date().getHours();
  return hour >= 12; // 12:00 – 23:59 → dark
}

/**
 * Time-aware theme toggle.
 * Auto-switches: Dark from 12pm → midnight | Light from midnight → 12pm.
 * Manual click still overrides the auto mode with animated spring knob.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check document element dark class or time
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") || shouldBeDark();
    }
    return shouldBeDark();
  });
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  );

  // Format current time as "3:42 PM"
  const getFormattedTime = () =>
    new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  // Sync dark class to <html> whenever isDark changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // Re-check clock every 60s to auto-switch theme
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleManualToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      id="theme-toggle"
      onClick={handleManualToggle}
      title={`Auto-theme • ${time} • Click to override`}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 bg-background/85 backdrop-blur-md border border-border rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 cursor-pointer shadow-lg z-50 transition-all duration-300 hover:shadow-xl hover:scale-105 group select-none max-w-[90vw]"
    >
      {/* Sun / Moon icon */}
      <span className="text-sm transition-transform duration-500 group-hover:rotate-12">
        {isDark ? "🌙" : "☀️"}
      </span>

      {/* Toggle pill track */}
      <div
        className={`rounded-full w-10 h-5 p-0.5 flex items-center transition-colors duration-300 ${
          isDark ? "bg-primary/90" : "bg-gray-300"
        }`}
      >
        <motion.div
          id="theme-toggle-circle"
          className="bg-white w-4 h-4 rounded-full shadow-md"
          animate={{ x: isDark ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>

      {/* Time label */}
      <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hidden sm:block min-w-[52px] text-center">
        {time}
      </span>
    </div>
  );
}

