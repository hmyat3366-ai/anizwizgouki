import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Encapsulates ALL imperative GSAP/DOM animation logic that was previously
 * jammed into a single massive useEffect inside App.
 *
 * Responsibilities:
 *  1. Scroll reveal (IntersectionObserver + ".reveal" class)
 *  2. Nav CTA visibility toggle
 *  3. Parallax effects (hero, marquee, text blocks)
 *  4. Magical image scroll morphing + flip
 *  5. Cursor trail for skill accordion items
 *  6. Sliding pill nav hover
 *  7. Header scroll hide/show
 *  8. Case study hover cursor
 *
 * All listeners are cleaned up via `gsap.context().revert()`.
 */
export function useGSAPAnimations(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
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
        trigger: "#services-section",
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
      const aboutPl = document.getElementById("about-placeholder");
      const heroBadge = document.getElementById("hero-badge");
      const servicesDot = document.getElementById("services-dot");
      const aboutDot = document.getElementById("about-dot");

      /** Returns an element's position/size relative to the document (not viewport). */
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

      // Position the magic container over the hero placeholder on load
      if (heroPl && magicContainer) {
        const hBox = getDocOffset(heroPl);
        gsap.set(magicContainer, { x: hBox.left, y: hBox.top, width: hBox.width, height: hBox.height, rotationY: 0, rotationX: 0 });
        if (magicInner) gsap.set(magicInner, { rotationY: 0 });
      }

      window.addEventListener("resize", () => ScrollTrigger.refresh());

      // Hero → Skills morph (flip to back face)
      if (magicContainer && servicesPl && heroPl) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#services-section",
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (heroBadge) heroBadge.style.opacity = String(1 - self.progress * 2);
              if (servicesDot) servicesDot.style.opacity = String(self.progress);
            },
          },
        });
        tl1.to(magicContainer, {
          x: () => getDocOffset(servicesPl).left,
          y: () => getDocOffset(servicesPl).top,
          width: () => getDocOffset(servicesPl).width,
          height: () => getDocOffset(servicesPl).height,
          ease: "power1.inOut",
        }, 0);
        if (magicInner) tl1.to(magicInner, { rotationY: 180, ease: "power1.inOut" }, 0);
      }

      // Skills → About morph (flip to front face again at 360°)
      if (magicContainer && aboutPl && servicesPl) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: "#about-section",
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (servicesDot) servicesDot.style.opacity = String(1 - self.progress);
              if (aboutDot) aboutDot.style.opacity = String(self.progress);
            },
          },
        });
        tl2.to(magicContainer, {
          x: () => getDocOffset(aboutPl).left,
          y: () => getDocOffset(aboutPl).top,
          width: () => getDocOffset(aboutPl).width,
          height: () => getDocOffset(aboutPl).height,
          ease: "power1.inOut",
        }, 0);
        if (magicInner) tl2.to(magicInner, { rotationY: 360, ease: "power1.inOut" }, 0);
      }

      // ── 5. Cursor Trail for Skill Accordion ──
      const cursorTrail = document.getElementById("cursor-trail-img") as HTMLImageElement | null;
      if (cursorTrail) {
        document.querySelectorAll(".accordion-item").forEach((item) => {
          item.addEventListener("mouseenter", () => {
            const imgSrc = (item as HTMLElement).dataset.image;
            if (imgSrc) cursorTrail.src = imgSrc;
            cursorTrail.style.opacity = "1";
            cursorTrail.style.transform = "scale(1)";
          });
          item.addEventListener("mouseleave", () => {
            cursorTrail.style.opacity = "0";
            cursorTrail.style.transform = "scale(0.5)";
          });
          item.addEventListener("mousemove", (e: Event) => {
            const mouseEvent = e as MouseEvent;
            cursorTrail.style.left = mouseEvent.clientX + 20 + "px";
            cursorTrail.style.top = mouseEvent.clientY + 20 + "px";
          });
        });
      }

      // ── 6. Sliding Pill Nav Hover ──
      const navList = document.getElementById("nav-list");
      const navLinks = document.querySelectorAll(".nav-link");
      const navPill = document.getElementById("nav-pill");

      function setPillPosition(element: Element | null, opacity: string) {
        if (!navPill || !element) return;
        const parentLi = (element as HTMLElement).parentElement!;
        navPill.style.width = `${parentLi.offsetWidth}px`;
        navPill.style.transform = `translateX(${parentLi.offsetLeft}px)`;
        navPill.style.opacity = opacity;
      }

      if (navLinks.length > 0) {
        setTimeout(() => setPillPosition(navLinks[0], "1"), 100);
        navLinks.forEach((link) => {
          link.addEventListener("mouseenter", (e) => setPillPosition(e.target as Element, "1"));
        });
        navList?.addEventListener("mouseleave", () => setPillPosition(navLinks[0], "1"));
      }

      // ── 7. Header Scroll Hide/Show ──
      const mainHeader = document.getElementById("main-header");
      let lastScrollY = window.scrollY;
      if (mainHeader) {
        window.addEventListener("scroll", () => {
          const currentScrollY = window.scrollY;
          if (currentScrollY <= 50) {
            mainHeader.classList.remove("scrolled", "scroll-down");
          } else {
            mainHeader.classList.add("scrolled");
            mainHeader.classList.toggle("scroll-down", currentScrollY > lastScrollY);
          }
          lastScrollY = currentScrollY;
        });
      }

      // ── 8. Case Study Hover Cursor ──
      const cursorTextView = document.getElementById("cursor-text-view");
      const cursorTextInner = document.getElementById("cursor-text-inner");
      if (cursorTextView && cursorTextInner) {
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
            cursorTextView.style.left = mouseEvent.clientX + "px";
            cursorTextView.style.top = mouseEvent.clientY + "px";
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
