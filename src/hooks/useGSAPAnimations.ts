import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Encapsulates GSAP and DOM animation logic with high-performance optimizations:
 *  1. IntersectionObserver scroll reveals with automatic cleanup
 *  2. Nav CTA visibility toggle
 *  3. Parallax effects (hero, marquee, text blocks) with GPU compositing
 *  4. Cached layout morphing for Magical Image (eliminates layout thrashing)
 *  5. GPU-accelerated cursor followers using translate3d & rAF coalescing
 *  6. Passive scroll listener with rAF throttle lock
 *  7. Complete cleanup of all observers, listeners, and frame requests
 */
export function useGSAPAnimations(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const ctx = gsap.context(() => {
      // ── 1. Scroll Reveal ──
      const reveals = document.querySelectorAll(".reveal");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      reveals.forEach((el) => revealObserver.observe(el));

      // ── 2. Nav CTA Visibility ──
      ScrollTrigger.create({
        trigger: "#project",
        start: "top center",
        onEnter: () => document.getElementById("main-header")?.classList.add("show-nav-cta"),
        onLeaveBack: () => document.getElementById("main-header")?.classList.remove("show-nav-cta"),
      });

      // ── 3. Parallax Effects ──
      document.querySelectorAll(".hero-parallax").forEach((el) => {
        gsap.to(el, {
          y: -100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top center", end: "bottom top", scrub: true },
        });
      });

      const marqueeWrapper = document.querySelector(".marquee-parallax-wrapper");
      if (marqueeWrapper) {
        gsap.to(marqueeWrapper, {
          x: -200,
          ease: "none",
          scrollTrigger: { trigger: marqueeWrapper, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }

      document.querySelectorAll(".text-block-parallax").forEach((block) => {
        gsap.to(block, {
          y: -80,
          ease: "none",
          scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });

      // ── 4. Magical Image Scroll Morphing ──
      const magicContainer = document.getElementById("magical-image-container");
      const magicInner = document.getElementById("magical-image-inner");
      const heroPl = document.getElementById("hero-placeholder");
      const servicesPl = document.getElementById("services-placeholder");
      const heroBadge = document.getElementById("hero-badge");
      const servicesDot = document.getElementById("services-dot");

      /** Returns an element's position/size relative to document */
      function getDocOffset(el: HTMLElement | null) {
        if (!el) return { top: 0, left: 0, width: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        };
      }

      // Cached bounding boxes to prevent synchronous reflows on scroll scrub
      let cachedHeroBox = getDocOffset(heroPl);
      let cachedServicesBox = getDocOffset(servicesPl);

      const updateCachedBoxes = () => {
        cachedHeroBox = getDocOffset(heroPl);
        cachedServicesBox = getDocOffset(servicesPl);
      };

      // Position the magic container over hero placeholder on load
      function updateMagicPosition() {
        if (!heroPl || !magicContainer) return;
        updateCachedBoxes();
        const st = ScrollTrigger.getById("hero-morph");
        if (!st || st.progress === 0) {
          gsap.set(magicContainer, {
            x: cachedHeroBox.left,
            y: cachedHeroBox.top,
            width: cachedHeroBox.width,
            height: cachedHeroBox.height,
            rotationY: 0,
            rotationX: 0,
          });
          if (magicInner && (!st || st.progress === 0)) gsap.set(magicInner, { rotationY: 0 });
        }
      }

      updateMagicPosition();

      const handleResize = () => {
        updateMagicPosition();
        ScrollTrigger.refresh();
      };

      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      window.addEventListener("resize", handleResize, { passive: true });

      // Hero → Skills morph (flip to back face)
      if (magicContainer && servicesPl && heroPl) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            id: "hero-morph",
            trigger: "#services-section",
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefresh: () => updateCachedBoxes(),
            onUpdate: (self) => {
              if (heroBadge) heroBadge.style.opacity = String(1 - self.progress * 2);
              if (servicesDot) servicesDot.style.opacity = String(self.progress);
            },
          },
        });
        tl1.fromTo(magicContainer, {
          x: () => cachedHeroBox.left,
          y: () => cachedHeroBox.top,
          width: () => cachedHeroBox.width,
          height: () => cachedHeroBox.height,
        }, {
          x: () => cachedServicesBox.left,
          y: () => cachedServicesBox.top,
          width: () => cachedServicesBox.width,
          height: () => cachedServicesBox.height,
          ease: "power1.inOut",
          immediateRender: false,
        }, 0);
        if (magicInner) tl1.to(magicInner, { rotationY: 180, ease: "power1.inOut" }, 0);
      }

      // ── 5. Cursor Trail for Skill Accordion (GPU transform + rAF coalescing) ──
      const cursorTrail = document.getElementById("cursor-trail-img") as HTMLImageElement | null;
      let trailRaf: number | null = null;
      let trailX = 0;
      let trailY = 0;

      const renderTrail = () => {
        if (cursorTrail) {
          cursorTrail.style.transform = `translate3d(${trailX + 20}px, ${trailY + 20}px, 0) scale(1)`;
        }
        trailRaf = null;
      };

      if (cursorTrail && !isTouch) {
        document.querySelectorAll(".accordion-item").forEach((item) => {
          item.addEventListener("mouseenter", () => {
            const imgSrc = (item as HTMLElement).dataset.image;
            if (imgSrc) cursorTrail.src = imgSrc;
            cursorTrail.style.opacity = "1";
          });
          item.addEventListener("mouseleave", () => {
            cursorTrail.style.opacity = "0";
            cursorTrail.style.transform = `translate3d(${trailX + 20}px, ${trailY + 20}px, 0) scale(0.5)`;
          });
          item.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            trailX = mouseEvent.clientX;
            trailY = mouseEvent.clientY;
            if (!trailRaf) {
              trailRaf = requestAnimationFrame(renderTrail);
            }
          }, { passive: true });
        });
      }

      // ── 6. Header Scroll Hide/Show (Passive + rAF lock) ──
      const mainHeader = document.getElementById("main-header");
      let scrollAnchor = window.scrollY;
      let lastScrollY = window.scrollY;
      let isScrollingDown = false;
      const SCROLL_DEAD_ZONE = 8;
      let scrollTicking = false;

      let onScroll: (() => void) | undefined;
      if (mainHeader) {
        const updateHeaderScroll = () => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY <= 50) {
            mainHeader.classList.remove("scrolled", "scroll-down");
            isScrollingDown = false;
          } else {
            mainHeader.classList.add("scrolled");
            
            if (currentScrollY > lastScrollY) {
              // Scrolling down
              if (!isScrollingDown && currentScrollY > scrollAnchor + SCROLL_DEAD_ZONE) {
                mainHeader.classList.add("scroll-down");
                isScrollingDown = true;
              }
              if (isScrollingDown) {
                scrollAnchor = currentScrollY;
              }
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up
              if (isScrollingDown && currentScrollY < scrollAnchor - SCROLL_DEAD_ZONE) {
                mainHeader.classList.remove("scroll-down");
                isScrollingDown = false;
              }
              if (!isScrollingDown) {
                scrollAnchor = currentScrollY;
              }
            }
          }
          lastScrollY = currentScrollY;
          scrollTicking = false;
        };

        onScroll = () => {
          if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(updateHeaderScroll);
          }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
      }

      // ── 7. Case Study Hover Cursor (GPU transform + rAF coalescing) ──
      const cursorTextView = document.getElementById("cursor-text-view");
      const cursorTextInner = document.getElementById("cursor-text-inner");
      let textCursorRaf: number | null = null;
      let textCursorX = 0;
      let textCursorY = 0;

      const renderTextCursor = () => {
        if (cursorTextView) {
          cursorTextView.style.transform = `translate3d(${textCursorX}px, ${textCursorY}px, 0) translate(-50%, -50%)`;
        }
        textCursorRaf = null;
      };

      if (cursorTextView && cursorTextInner && !isTouch) {
        document.querySelectorAll(".case-study-item").forEach((item) => {
          item.addEventListener("mouseenter", () => {
            cursorTextView.style.opacity = "1";
            cursorTextInner.classList.replace("scale-50", "scale-100");
          });
          item.addEventListener("mouseleave", () => {
            cursorTextView.style.opacity = "0";
            cursorTextInner.classList.replace("scale-100", "scale-50");
          });
          item.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            textCursorX = mouseEvent.clientX;
            textCursorY = mouseEvent.clientY;
            if (!textCursorRaf) {
              textCursorRaf = requestAnimationFrame(renderTextCursor);
            }
          }, { passive: true });
        });
      }

      return () => {
        revealObserver.disconnect();
        if (onScroll) window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
        if (trailRaf) cancelAnimationFrame(trailRaf);
        if (textCursorRaf) cancelAnimationFrame(textCursorRaf);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
