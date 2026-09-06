import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { useAdaptivePerformance } from "../../hooks/useAdaptivePerformance";

// Pre-compute durations outside component to avoid impure render calls
const PATH_DURATIONS = Array.from({ length: 36 }, (_, i) =>
  20 + ((i * 7 + 13) % 10)
);

export function FloatingPaths({ position }: { position: number }) {
  const { pathDensity, isLowPower } = useAdaptivePerformance();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Pause off-screen rendering using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute paths adaptively based on hardware tier
  const paths = useMemo(() => {
    return Array.from({ length: pathDensity }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      opacity: 0.1 + i * 0.03,
      duration: isLowPower ? PATH_DURATIONS[i] * 1.25 : PATH_DURATIONS[i],
    }));
  }, [position, pathDensity, isLowPower]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              isInView
                ? {
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                    pathOffset: [0, 1, 0],
                  }
                : { pathLength: 0.3, opacity: 0.3 }
            }
            transition={{
              duration: path.duration,
              repeat: isInView ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
