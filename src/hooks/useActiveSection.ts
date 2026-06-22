import { useEffect, useState } from "react";
import { OBSERVED_SECTION_IDS, SECTION_ID_TO_KEY } from "../data/navigation";

/**
 * Tracks which page section is currently in view and returns the
 * corresponding nav key (e.g. "home", "skill", "about", "project").
 *
 * Uses IntersectionObserver with a 30% threshold — avoids scroll-event spam.
 */
export function useActiveSection(defaultSection = "home") {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Map "services-section" → "skill", "about-section" → "about", etc.
            setActiveSection(SECTION_ID_TO_KEY[id] ?? id);
          }
        });
      },
      { threshold: 0.3 }
    );

    OBSERVED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
