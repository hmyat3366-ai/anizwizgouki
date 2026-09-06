"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useAdaptivePerformance } from "@/hooks/useAdaptivePerformance";

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[], isVisible: boolean) => {
  const { blurScale } = useAdaptivePerformance();
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(2.5); // 2.5 seconds initial delay
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2 || !texts || texts.length === 0) return;

      const maxBlur = 80 * blurScale;
      const b2 = Math.min((8 / fraction - 8) * blurScale, maxBlur);
      current2.style.filter = `blur(${b2}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      const b1 = Math.min((8 / invertedFraction - 8) * blurScale, maxBlur);
      current1.style.filter = `blur(${b1}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts, blurScale],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2 && texts && texts.length > 0) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
      
      current2.textContent = texts[textIndexRef.current % texts.length];
      current1.textContent = texts[(textIndexRef.current + 1) % texts.length];
    }
  }, [texts]);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;
    timeRef.current = new Date();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();

    const handleResize = () => {
      doCooldown();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [doMorph, doCooldown, isVisible]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts"> & { isVisible: boolean }> = ({ texts, isVisible }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts, isVisible);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  );
};

/** Render SVG filter offscreen without display:none to keep filter context active */
const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    aria-hidden="true"
    className="fixed top-0 left-0 w-0 h-0 opacity-0 pointer-events-none overflow-hidden"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rAF when off-screen to conserve CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none [filter:url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
        className,
      )}
    >
      <Texts texts={texts} isVisible={isVisible} />
      <SvgFilters />
    </div>
  );
};

export { MorphingText };
