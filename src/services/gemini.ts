import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase Client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export const getGeminiChatResponse = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    }

    // Convert history format if needed (model -> assistant for OpenRouter compatibility)
    const formattedHistory = history.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.content,
    }));

    // Call the Supabase Edge Function securely
    const { data, error } = await supabase.functions.invoke('chat-with-sora', {
      body: { 
        message, 
        history: formattedHistory,
      },
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
