import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage, getGeminiChatResponse } from "../services/gemini";

type Language = "en" | "my";

export function useChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getGreeting = (lang: Language) => {
    return lang === "en"
      ? "Hi Sir or Madam, I'm Htet Myat Oo (Gouki)'s Assistant Sora. How can I help you today?"
      : "မင်္ဂလာပါရှင်။ ကျွန်မကတော့ Htet Myat Oo (Gouki) ရဲ့ Assistant Sora ပါ။ ဘာများ ကူညီပေးရမလဲရှင်?";
  };

  // Initialize Greeting based on Language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "model", content: getGreeting(language) }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageSwitch = useCallback((lang: Language) => {
    setLanguage(lang);
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].role === "model") {
        newMessages[0].content = getGreeting(lang);
      }
      return newMessages;
    });
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      // Pass the current messages as history
      const responseText = await getGeminiChatResponse(userMsg, messages);
      setMessages((prev) => [...prev, { role: "model", content: responseText }]);
    } catch (error) {
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
