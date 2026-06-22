import { NAV_LINKS } from "../data/navigation";
import { X } from "lucide-react";
import { asset } from "../lib/asset";

interface MobileNavProps {
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ activeSection, isOpen, onClose }: MobileNavProps) {


  return (
    <div className={`fixed inset-0 z-0 bg-zinc-950 dark:bg-black flex flex-col justify-between py-12 px-6 overflow-hidden transition-opacity duration-700 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
      {/* Top: Avatar & Close */}
      <div className="flex justify-between items-center w-full max-w-[65vw]">
        <div className="relative overflow-hidden rounded-full w-12 h-12 border border-white/20">
          <img src={asset("logo.png")} alt="Logo" className="w-full h-full object-cover grayscale" />
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-10 w-full max-w-[65vw] mt-12 flex-1 justify-center">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.sectionKey;
          return (
            <a
              key={link.sectionKey}
              href={link.href}
              onClick={onClose}
              className={`flex items-center text-lg font-bold uppercase tracking-widest transition-colors ${
                isActive ? "text-primary" : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="w-full max-w-[65vw] pb-8">
        <a
          href="#contact"
          onClick={onClose}
          className="bg-primary text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center w-full shadow-lg"
        >
          Let's Talk
        </a>
      </div>
    </div>
  );
}
