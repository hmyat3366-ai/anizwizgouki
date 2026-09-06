import { useState, useEffect } from "react";
import type { NavigatorExtended } from "../types";

export type PerformanceTier = "high" | "medium" | "low";

export interface AdaptiveConfig {
  tier: PerformanceTier;
  pathDensity: number;
  enableHeavyCursor: boolean;
  blurScale: number;
  isLowPower: boolean;
  isTouchDevice: boolean;
}

/**
 * Model / Device Adaptive Performance Engine.
 * Dynamically senses hardware capability, network state, battery/data saver,
 * and user motion preferences to adjust computation intensity without
 * removing ANY feature, section, animation, or visual element.
 */
export function useAdaptivePerformance(): AdaptiveConfig {
  const [config, setConfig] = useState<AdaptiveConfig>(() => {
    if (typeof window === "undefined") {
      return {
        tier: "high",
        pathDensity: 36,
        enableHeavyCursor: true,
        blurScale: 1.0,
        isLowPower: false,
        isTouchDevice: false,
      };
    }

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as NavigatorExtended;

    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const connection = nav.connection;
    const isDataSaver = connection?.saveData === true;
    const isSlowConnection = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";

    let tier: PerformanceTier = "high";

    if (prefersReducedMotion || isDataSaver || isSlowConnection || (cores <= 4 && memory <= 4 && isTouch)) {
      tier = "low";
    } else if (cores <= 6 || memory <= 6 || isTouch || connection?.effectiveType === "3g") {
      tier = "medium";
    }

    return {
      tier,
      pathDensity: tier === "high" ? 36 : tier === "medium" ? 24 : 14,
      enableHeavyCursor: !isTouch,
      blurScale: tier === "high" ? 1.0 : tier === "medium" ? 0.75 : 0.5,
      isLowPower: tier === "low",
      isTouchDevice: isTouch,
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setConfig((prev) => ({
          ...prev,
          tier: "low",
          pathDensity: 14,
          blurScale: 0.5,
          isLowPower: true,
        }));
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    const nav = navigator as NavigatorExtended;
    const handleConnectionChange = () => {
      const conn = nav.connection;
      if (conn?.saveData || conn?.effectiveType === "2g") {
        setConfig((prev) => ({
          ...prev,
          tier: "low",
          pathDensity: 14,
          isLowPower: true,
        }));
      }
    };

    nav.connection?.addEventListener?.("change", handleConnectionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      nav.connection?.removeEventListener?.("change", handleConnectionChange);
    };
  }, []);

  return config;
}
