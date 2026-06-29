import { X, Send, User, Bot, Sparkles, Code, Briefcase } from "lucide-react";
import { useChatAgent } from "../../hooks/useChatAgent";

export default function ChatAgent() {
  const {
    isOpen,
    setIsOpen,
    language,
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleLanguageSwitch,
    handleSend,
    handleFAQ,
  } = useChatAgent();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-10 z-[200] bg-foreground text-background px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 font-display uppercase font-bold tracking-widest text-[11px] border border-border/10 group overflow-hidden ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="flex items-center gap-2 relative z-10">
          Ask Sora
          <span className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_currentColor]"></span>
          </span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        role="dialog"
        aria-label="Chat with Sora AI Assistant"
        className={`fixed bottom-0 right-0 w-full h-[85vh] sm:h-[650px] sm:max-h-[85vh] sm:w-[440px] sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-[200] bg-background/90 dark:bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-border/5 rounded-t-3xl sm:rounded-[2rem] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-[20%] opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-border/30 bg-background/50 backdrop-blur-xl flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/40 flex items-center justify-center shrink-0 relative z-10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Sparkles size={20} />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold uppercase tracking-widest text-xs text-foreground">
                Sora AI Assistant
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  Online & Ready
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language & FAQ Controls */}
        <div className="p-4 border-b border-border/20 shrink-0 bg-secondary/20 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => handleLanguageSwitch("en")}
              className={`flex-1 text-[10px] uppercase font-bold tracking-widest py-2.5 rounded-full transition-all duration-300 border ${
                language === "en"
                  ? "bg-foreground text-background border-foreground shadow-lg scale-100"
                  : "border-border/50 hover:bg-foreground/5 hover:border-foreground/30 scale-95 hover:scale-100 text-muted-foreground"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSwitch("my")}
              className={`flex-1 text-[10px] uppercase font-bold tracking-widest py-2.5 rounded-full transition-all duration-300 border ${
                language === "my"
                  ? "bg-foreground text-background border-foreground shadow-lg scale-100"
                  : "border-border/50 hover:bg-foreground/5 hover:border-foreground/30 scale-95 hover:scale-100 text-muted-foreground"
              }`}
            >
              မြန်မာလို
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
            <button
              onClick={() => handleFAQ(language === "en" ? "What is your UX process?" : "အစ်ကို့ရဲ့ UX Process အကြောင်း ပြောပြပါ")}
              className="snap-start shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold border border-border/40 bg-background/60 backdrop-blur-md px-4 py-2.5 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <Code size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />{" "}
              {language === "en" ? "UX Process" : "UX Process"}
            </button>
            <button
              onClick={() => handleFAQ(language === "en" ? "Can you share the Github/Figma links for Aura, DMAR, and Skyline?" : "Aura, DMAR, Skyline ရဲ့ Github နဲ့ Figma လင့်ခ်တွေ ပေးလို့ရမလား?")}
              className="snap-start shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold border border-border/40 bg-background/60 backdrop-blur-md px-4 py-2.5 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <Briefcase size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />{" "}
              {language === "en" ? "Project Links" : "Project Links"}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-6 scroll-smooth scrollbar-hide bg-gradient-to-b from-transparent to-background/20">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-secondary to-secondary/50 border border-border text-foreground"
                    : "bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 text-primary"
                }`}
              >
                {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div
                className={`max-w-[85%] p-4.5 text-[13.5px] sm:text-[14px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-foreground to-foreground/85 text-background rounded-2xl rounded-tr-sm"
                    : "border border-white/10 dark:border-white/5 bg-secondary/40 backdrop-blur-md rounded-2xl rounded-tl-sm text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap tracking-wide">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 text-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Bot size={15} />
              </div>
              <div className="px-5 py-4.5 border border-white/10 bg-secondary/40 backdrop-blur-md rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-background/80 backdrop-blur-xl relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-full p-1.5 pl-5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 shadow-inner group"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "en" ? "Ask Sora anything..." : "Sora ကို မေးကြည့်ပါ..."}
              className="flex-1 bg-transparent border-none outline-none text-[14px] placeholder:text-muted-foreground/60 focus:ring-0"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send Message"
              className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-40 disabled:scale-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.4)] hover:shadow-[0_0_20px_rgba(var(--primary),0.6)]"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
