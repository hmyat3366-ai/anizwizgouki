import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests for Browser Call
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, history } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error("API Key is missing in Edge Function secrets.");
    }

    // Format history for OpenRouter Compatible API
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message }
    ];

    // Using OpenRouter API because the key starts with 'sk-or-v1'
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", 
        messages: messages
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error?.message || "Error calling AI API");
    }

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
