import { useEffect, useRef, useState } from "react";
import { OBSERVED_SECTION_IDS, SECTION_ID_TO_KEY } from "../data/navigation";

/**
 * Tracks which page section is currently in view by checking scroll position.
 * Optimized with a requestAnimationFrame tick lock to avoid layout thrashing
 * on high-frequency scroll events.
 */
export function useActiveSection(defaultSection = "home") {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const defaultRef = useRef(defaultSection);

  useEffect(() => {
    let isTicking = false;

    const getActiveId = () => {
      // The "trigger line" — 30% down from the top of the viewport
      const triggerY = window.innerHeight * 0.3;

      let closestId = defaultRef.current;
      let closestDist = Infinity;

      OBSERVED_SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - triggerY);

        // Only consider sections whose top has passed the trigger line
        if (rect.top <= triggerY + 10 && dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      const key = SECTION_ID_TO_KEY[closestId] ?? closestId;
      setActiveSection((prev) => (prev !== key ? key : prev));
      isTicking = false;
    };

    const handleScrollOrResize = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(getActiveId);
      }
    };

    getActiveId();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return activeSection;
}
