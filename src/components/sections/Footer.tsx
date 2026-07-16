import { SOCIAL_LINKS, CONTACT_EMAIL } from "../../data/navigation";

export default function Footer() {
  return (
    <footer id="contact" className="w-full relative bg-gray-900 dark:bg-black text-white pt-24 pb-28 mt-20 sm:mt-32 rounded-t-[3rem] sm:rounded-t-[5rem] overflow-hidden reveal z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      {/* Marquee */}
      <div className="w-full overflow-hidden whitespace-nowrap mb-16 border-b border-border pb-10">
        <div className="animate-marquee flex items-center gap-8">
          {[0, 1].map((i) => (
            <span key={i} className="contents">
              <span className="font-display text-[80px] md:text-[120px] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-200 opacity-60">Let's Build Something</span>
              <span className="font-display text-[60px] md:text-[90px] text-primary">*</span>
              <span className="font-display text-[80px] md:text-[120px] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-200 opacity-60">Great Together</span>
              <span className="font-display text-[60px] md:text-[90px] text-primary">*</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-24">
          {/* Contact */}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 block">Got an idea?</span>
            <h2 className="font-display text-5xl sm:text-7xl uppercase font-bold mb-8">Drop me a line</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="group text-xl sm:text-3xl text-gray-300 hover:text-white transition-colors border-b border-gray-600 hover:border-primary pb-2 w-fit flex items-center gap-4">
              {CONTACT_EMAIL}
              <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col md:items-end">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block md:text-right">Socials</span>
            <ul className="flex flex-col md:items-end gap-3">
              {SOCIAL_LINKS.map((link, i) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer"
                    className={`text-2xl hover:text-primary transition-colors uppercase font-bold font-display tracking-widest flex items-center gap-2 group ${i > 0 ? "md:flex-row-reverse md:justify-end" : ""}`}>
                    {i > 0 && <span className="hidden md:inline text-xs opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">↗</span>}
                    {link.label}
                    <span className={`${i > 0 ? "md:hidden " : ""}text-xs opacity-0 group-hover:opacity-100 transition-opacity text-gray-500`}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-gray-500 text-[10px] sm:text-xs tracking-widest uppercase font-bold">
          <p>&copy; 2026 Aniz Wiz Gouki. All Rights Reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#/" className="hover:text-white transition-colors">Privacy</a>
            <a href="#/" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
