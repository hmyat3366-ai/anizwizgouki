import { NAV_LINKS } from "../data/navigation";
import { ArrowIcon } from "./icons";
import { asset } from "../lib/asset";
import { Menu } from "lucide-react";
import { useEffect, useCallback } from "react";

interface HeaderProps {
  activeSection: string;
  onOpenMobileNav: () => void;
}

/**
 * Sticky header with sliding pill navigation, availability badge, and CTA.
 * Scroll behavior (hide/show/pill) is driven by the GSAP hook via DOM IDs.
 */
export default function Header({ activeSection, onOpenMobileNav }: HeaderProps) {
  // Move the nav pill to a given nav link element
  const movePill = useCallback((el: Element | null) => {
    const pill = document.getElementById("nav-pill");
    if (!pill || !el) return;
    const li = (el as HTMLElement).parentElement!;
    pill.style.width = `${li.offsetWidth}px`;
    pill.style.transform = `translateX(${li.offsetLeft}px)`;
    pill.style.opacity = "1";
  }, []);

  // Sync pill to active section on scroll/click & handle window resize
  useEffect(() => {
    const updateActivePill = () => {
      const activeLink = document.querySelector(
        `.nav-link[href="#${NAV_LINKS.find((l) => l.sectionKey === activeSection)?.href.slice(1)}"]`
      );
      if (activeLink) movePill(activeLink);
    };

    updateActivePill();

    window.addEventListener("resize", updateActivePill);
    return () => window.removeEventListener("resize", updateActivePill);
  }, [activeSection, movePill]);

  // Hover handlers for pill
  const handleLinkHover = (e: React.MouseEvent) => movePill(e.currentTarget);
  const handleNavLeave = () => {
    const activeLink = document.querySelector(
      `.nav-link[href="#${NAV_LINKS.find((l) => l.sectionKey === activeSection)?.href.slice(1)}"]`
    );
    if (activeLink) movePill(activeLink);
  };
  return (
    <header
      id="main-header"
      className="sticky top-0 left-0 w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex items-center justify-between z-[100] pointer-events-none"
    >
      {/* Logo */}
      <div
        id="header-logo"
        className="flex items-center gap-3 pointer-events-auto cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.5,0,0,1)] shrink-0"
      >
        <div className="relative overflow-hidden rounded-full w-10 h-10 border border-border bg-[#0B0B0B] p-1.5 flex items-center justify-center shrink-0">
          <img
            src={asset("awg-logo.svg")}
            alt="Aniz Wiz Gouki Monogram"
            className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 shrink-0"
          />
        </div>
      </div>

      {/* Center Nav (Desktop Only) */}
      <nav
        id="center-nav"
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 items-center bg-background/80 backdrop-blur-xl rounded-full p-1.5 border border-gray-200/50 dark:border-border/50 shadow-sm pointer-events-auto transition-all duration-500 overflow-hidden"
      >
        {/* Nav Links */}
        <div id="nav-state-1" className="flex items-center overflow-hidden">
          <ul
            id="nav-list"
            onMouseLeave={handleNavLeave}
            className="relative flex items-center text-[13px] font-bold uppercase tracking-widest text-muted-foreground min-w-max"
          >
            <div
              id="nav-pill"
              className="absolute top-0 left-0 h-full bg-secondary rounded-full transition-all duration-300 ease-out z-0 opacity-0 pointer-events-none"
            />
            {NAV_LINKS.map((link) => (
              <li key={link.sectionKey} className="relative z-10">
                <a
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  className={`nav-link px-6 py-2.5 block transition-colors font-bold ${
                    activeSection === link.sectionKey
                      ? "text-primary"
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability Badge */}
        <a
          id="nav-state-2"
          href="#/"
          className="flex items-center overflow-hidden pointer-events-none group rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <div className="px-6 py-2.5 flex items-center gap-3 min-w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
            </span>
            <span className="text-[13px] font-bold uppercase tracking-widest text-foreground transition-colors">
              Available for work
            </span>
          </div>
        </a>

        {/* Mini CTA Icon */}
        <div id="nav-cta-icon" className="overflow-hidden flex items-center justify-center shrink-0">
          <a
            href="#contact"
            title="Let's Talk"
            className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 w-10 h-10 shrink-0 shadow-md shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </a>
        </div>
      </nav>

      {/* Desktop CTA Button */}
      <div className="hidden md:flex items-center gap-4 pointer-events-auto">
        <a
          id="header-cta"
          href="#contact"
          className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 rounded-full text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transform transition-all duration-500 ease-[cubic-bezier(0.5,0,0,1)] hover:scale-105 active:scale-95 flex items-center"
        >
          <div className="relative overflow-hidden h-5 flex items-center">
            <span className="flex items-center gap-2 transition-transform duration-500 group-hover:-translate-y-[150%]">
              Let's Talk <ArrowIcon />
            </span>
            <span className="absolute left-0 flex items-center gap-2 transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0">
              Let's Talk <ArrowIcon className="w-3.5 h-3.5 transform -rotate-45" />
            </span>
          </div>
        </a>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={onOpenMobileNav}
        className="md:hidden pointer-events-auto w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors shadow-sm"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}
