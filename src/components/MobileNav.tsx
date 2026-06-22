import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/navigation";
import { X, Menu } from "lucide-react";

interface MobileNavProps {
  activeSection: string;
}

export default function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center z-[200] pointer-events-auto">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors shadow-sm"
      >
        <Menu size={20} />
      </button>

      {/* Full Screen Overlay */}
      <div
        className={`fixed inset-0 w-full h-[100dvh] bg-background z-[300] flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Top Header of Menu */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-border">
          <span className="font-display uppercase tracking-widest text-xs font-bold">
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Giant Links */}
        <div className="flex-1 flex flex-col justify-center px-6 gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.sectionKey}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-display text-[50px] sm:text-[70px] uppercase font-bold leading-none tracking-tighter transition-all duration-500 flex items-center justify-between group ${
                activeSection === link.sectionKey
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
              style={{
                transform: isOpen ? "translateY(0)" : "translateY(50px)",
                opacity: isOpen ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span>{link.label}</span>
              <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer of Menu */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-foreground text-background px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-center w-full shadow-lg"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </div>
  );
}
