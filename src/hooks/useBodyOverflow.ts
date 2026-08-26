import { useEffect } from "react";

/**
 * Locks body scroll when `isLocked` is true (e.g. when a modal is open).
 * Cleans up on unmount to prevent scroll-lock leaks.
 */
export function useBodyOverflow(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocked]);
}
