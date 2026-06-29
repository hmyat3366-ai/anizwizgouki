import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
// These variables are safe to be exposed on the frontend.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export const getGeminiChatResponse = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    // Convert history format if needed (model -> assistant for OpenRouter compatibility)
    const formattedHistory = history.map(msg => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.content
    }));

    // Call the Supabase Edge Function securely
    const { data, error } = await supabase.functions.invoke('chat-with-sora', {
      body: { 
        message, 
        history: formattedHistory 
      }
    });

    if (error) {
      console.error("Edge Function Error:", error);
      throw error;
    }

    return data.response;
  } catch (error) {
    console.error("Supabase Error:", error);
    throw error;
  }
};
