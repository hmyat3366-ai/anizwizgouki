import { useEffect, useRef, useState } from "react";
import { OBSERVED_SECTION_IDS, SECTION_ID_TO_KEY } from "../data/navigation";

/**
 * Tracks which page section is currently in view by checking scroll position
 * on every scroll event — finds the section whose top is closest to 30% of
 * the viewport height. More reliable than IntersectionObserver for sections
 * with very different heights (e.g. the sticky Case Studies section).
 */
export function useActiveSection(defaultSection = "home") {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const defaultRef = useRef(defaultSection);

  useEffect(() => {
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
    };

    getActiveId();
    window.addEventListener("scroll", getActiveId, { passive: true });
    window.addEventListener("resize", getActiveId, { passive: true });
    return () => {
      window.removeEventListener("scroll", getActiveId);
      window.removeEventListener("resize", getActiveId);
    };
  }, []);

  return activeSection;
}
