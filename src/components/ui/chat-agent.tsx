import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send, User, Bot, Sparkles, Code, Briefcase } from "lucide-react";

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

interface Message {
  role: "user" | "model";
  content: string;
}

const SYSTEM_PROMPT = `
You are Sora, the personal AI Assistant for Htet Myat Oo (also known as Aniz Wiz Gouki).
Htet Myat Oo is a Jr. UI/UX Designer who specializes in Editorial Brutalist Design, Interaction Design, and Design-to-Code prototyping.
Skills: Figma, React, GSAP, Tailwind CSS, User Research, Wireframing.
Projects: 
1. DMAR (Platform for Myanmar people in Dubai to find Myanmar food and rent rooms)
2. Aura Real Estate (Property search platform for real estate in USA locations like Miami, Alaska, Los Angeles, etc.)
3. Skyline (Website Services Agency)
Experience: UI/UX Intern at a Tech Firm where he handled end-to-end design to code.
Contact Email: hmyat0407@gmail.com
Social Media:
- Instagram: @anizwizgouki
- Facebook: Htet Myat Oo
Your job is to answer recruiter or client questions politely, creatively, and accurately based on this data.
If the user asks in Burmese, reply in Burmese. If they ask in English, reply in English.
Keep answers concise, professional, and enthusiastic. Never break character.
`;

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "my">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Greeting based on Language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "model",
          content: language === "en" 
            ? "Hi Sir or Madam, I'm Htet Myat Oo (Gouki)'s Assistant Sora. How can I help you today?" 
            : "မင်္ဂလာပါရှင်။ ကျွန်မကတော့ Htet Myat Oo (Gouki) ရဲ့ Assistant Sora ပါ။ ဘာများ ကူညီပေးရမလဲရှင်?",
        },
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageSwitch = (lang: "en" | "my") => {
    setLanguage(lang);
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].role === "model") {
        newMessages[0].content = lang === "en" 
          ? "Hi Sir or Madam, I'm Htet Myat Oo (Gouki)'s Assistant Sora. How can I help you today?" 
          : "မင်္ဂလာပါရှင်။ ကျွန်မကတော့ Htet Myat Oo (Gouki) ရဲ့ Assistant Sora ပါ။ ဘာများ ကူညီပေးရမလဲရှင်?";
      }
      return newMessages;
    });
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT
      });

      // Gemini requires the first message in history to be from the 'user'.
      const validHistory = messages[0]?.role === "model" ? messages.slice(1) : messages;

      const chat = model.startChat({
        history: validHistory.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }))
      });

      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      const responseText = response.text();

      setMessages((prev) => [...prev, { role: "model", content: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: "model", content: language === "en" ? "Sorry, my systems are currently experiencing an error." : "တောင်းပန်ပါတယ်။ ကျွန်မရဲ့ စနစ်မှာ အနည်းငယ် ချို့ယွင်းချက်ဖြစ်နေပါတယ်။" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFAQ = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-10 z-[200] bg-foreground text-background px-6 py-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 font-display uppercase font-bold tracking-widest text-[11px] border border-border/20 group overflow-hidden ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <span className="flex items-center gap-2">
            Ask Sora
            <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
        </span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-0 right-0 w-full h-[85vh] sm:h-[600px] sm:max-h-[85vh] sm:w-[420px] sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-[200] bg-background/80 dark:bg-background/70 backdrop-blur-3xl border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-t-3xl sm:rounded-[2rem] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.5,0,0,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-border/50 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 relative z-10 text-primary">
                <Sparkles size={18} />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold uppercase tracking-widest text-xs text-foreground">Sora AI Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Online & Ready</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300">
            <X size={18} />
          </button>
        </div>

        {/* Language & FAQ Controls */}
        <div className="p-4 border-b border-border/50 shrink-0 bg-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => handleLanguageSwitch("en")}
              className={`flex-1 text-[9px] uppercase font-bold tracking-widest py-2 rounded-full transition-all duration-300 border ${language === 'en' ? 'bg-foreground text-background border-foreground shadow-md' : 'border-border/50 hover:bg-foreground/5 hover:border-foreground/20'}`}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageSwitch("my")}
              className={`flex-1 text-[9px] uppercase font-bold tracking-widest py-2 rounded-full transition-all duration-300 border ${language === 'my' ? 'bg-foreground text-background border-foreground shadow-md' : 'border-border/50 hover:bg-foreground/5 hover:border-foreground/20'}`}
            >
              မြန်မာလို
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button onClick={() => handleFAQ(language === "en" ? "What is your UX process?" : "အစ်ကို့ရဲ့ UX Process အကြောင်း ပြောပြပါ")} className="shrink-0 flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold border border-border/50 bg-background/50 backdrop-blur-sm px-3.5 py-2 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group">
              <Code size={12} className="opacity-70 group-hover:opacity-100" /> {language === "en" ? "UX Process" : "UX Process"}
            </button>
            <button onClick={() => handleFAQ(language === "en" ? "What projects have you worked on?" : "ဘာ Project တွေ လုပ်ခဲ့ဖူးလဲ?")} className="shrink-0 flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold border border-border/50 bg-background/50 backdrop-blur-sm px-3.5 py-2 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group">
              <Briefcase size={12} className="opacity-70 group-hover:opacity-100" /> {language === "en" ? "Projects" : "Projects"}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both ${msg.role === 'user' ? 'flex-row-reverse' : ''}`} style={{ animationDelay: `${idx * 50}ms` }}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-secondary text-muted-foreground' : 'bg-primary/20 border border-primary/30 text-primary'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[80%] p-4 text-[13px] sm:text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-foreground text-background rounded-2xl rounded-tr-sm' : 'border border-border/50 bg-background rounded-2xl rounded-tl-sm'}`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 text-primary flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} />
              </div>
              <div className="px-5 py-4 border border-border/50 bg-background rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-md">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 shrink-0 bg-background/80 backdrop-blur-xl relative">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2 bg-background border border-border/60 rounded-full p-1.5 pl-5 focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-foreground/10 transition-all duration-300 shadow-sm"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === "en" ? "Ask Sora anything..." : "Sora ကို မေးကြည့်ပါ..."}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/70"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary text-gray-900 w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:scale-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
