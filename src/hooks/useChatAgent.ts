import { useState, useRef, useEffect, useCallback } from "react";
import { getGeminiChatResponse, type ChatMessage } from "../services/gemini";

export type Language = "en" | "my";

const GREETINGS: Record<Language, string> = {
  en: "Hi Sir or Madam, I'm Htet Myat Oo (Gouki)'s Assistant Sora. How can I help you today?",
  my: "မင်္ဂလာပါရှင်။ ကျွန်မကတော့ Htet Myat Oo (Gouki) ရဲ့ Assistant Sora ပါ။ ဘာများ ကူညီပေးရမလဲရှင်?",
};

export function useChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "model", content: GREETINGS.en },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageSwitch = useCallback((lang: Language) => {
    setLanguage(lang);
    setMessages((prev) => {
      // If user hasn't sent any message yet, swap the welcome greeting
      if (prev.length === 1 && prev[0].role === "model") {
        return [{ role: "model", content: GREETINGS[lang] }];
      }
      return prev;
    });
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await getGeminiChatResponse(userMsg, messages);
      setMessages((prev) => [...prev, { role: "model", content: responseText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            language === "en"
              ? "Sorry, my systems are currently experiencing an error."
              : "တောင်းပန်ပါတယ်။ ကျွန်မရဲ့ စနစ်မှာ အနည်းငယ် ချို့ယွင်းချက်ဖြစ်နေပါတယ်။",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, language]);

  const handleFAQ = useCallback((question: string) => {
    handleSend(question);
  }, [handleSend]);

  return {
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
  };
}
