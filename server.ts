import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Shared lazy-initialized Gemini SDK client
  let aiClient: GoogleGenAI | null = null;

  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        throw new Error(
          "GEMINI_API_KEY is not configured. Please add your Gemini API key in the Settings > Secrets panel of Google AI Studio."
        );
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Endpoints
  app.post("/api/generate", async (req, res) => {
    try {
      const { profession, achievement, experienceLevel, industry, goal, tone } = req.body;

      if (!profession || !industry) {
        return res.status(400).json({
          error: "Profession and Industry are required to generate a personal brand analysis.",
        });
      }

      const client = getGeminiClient();

      const userTone = tone || "Thought Leadership";
      const userGoal = goal || "Grow professional network and showcase expertise";
      const userExperience = experienceLevel || "Experienced Professional";
      const userAchievement = achievement || "Delivered exceptional business results";

      const prompt = `
        You are PersonalBrand AI, an expert LinkedIn strategist, personal branding consultant, list-building wizard, and copywriter.
        Analyze the following user profile info and construct a high-performing professional personal branding kit:
        
        - Profession: ${profession}
        - Key Achievement: ${userAchievement}
        - Experience Level: ${userExperience}
        - Industry: ${industry}
        - Primary Creator Goal: ${userGoal}
        - Target Tone: ${userTone}
        
        Requirements for the LinkedIn Post & Alternatives:
        1. Maintain the selected tone for the primary post (${userTone}).
        2. Hook: Ensure the primary post starts with a powerful, scroll-stopping 1-2 line hook (no cheesiness).
        3. Copy Structure: Use professional LinkedIn layout spacing with line breaks, clear bullet points, bullet emojis if appropriate, and readable blocks.
        4. No "AI slop" or generic motivational fluff. Keep it hard-hitting, pragmatic, and highly realistic.
        5. Encourage active discussion with an elegant final question (CTA).
        6. Offer 3 distinct alternate versions of the post (Professional, Storytelling, and Inspirational) to give the user ultimate choice.
        7. Headlines: Create exactly 5 catchy, high-conversion, professional taglines/headlines utilizing structural formulas like "Helping [Target Audience] with [Benefit] | [Experience/Key Skill]".
        8. Hashtags: Provide 5 highly targeted niche hashtags and 5 verified trending professional hashtags.
        9. Engagement Strategy: Offer the single best time of day to post (e.g., Tuesday 8:30 AM EST) with brief validation, a pre-written "First Comment" prompt that seeds discussions, target accounts or personas to tag, and 3 specific, highly tailored engagement tactics.
        10. Personal Brand Analysis: Define 3 core highlighted strengths, 5 powerful branding keywords, and 3 content pillars to prioritize going forward.
        11. Content Calendar (7 Days): Provide exactly 7 subsequent days of content ideas. Format as a table/list specifying Day 1-7, Topic Title, Description, and Key Message.
        12. Profile Tweaks: Recommend tactical improvements to the user's Headline, a customizable template draft for their About search-optimized bio, and 3 ideas for their Featured media section.
      `;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are PersonalBrand AI, a premium, hyper-knowledgeable LinkedIn advisor. Write output with elite marketing intelligence.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryPost: {
                type: Type.STRING,
                description: "The primary high-performing LinkedIn post based on the requested tone.",
              },
              alternatives: {
                type: Type.OBJECT,
                properties: {
                  professional: {
                    type: Type.STRING,
                    description: "An alternate, highly professional and direct trade-focused version of the post.",
                  },
                  storytelling: {
                    type: Type.STRING,
                    description: "An alternate narrative storytelling version using a setback-to-insight structure.",
                  },
                  inspirational: {
                    type: Type.STRING,
                    description: "An alternate version emphasizing passion, lessons learned, and empowering readers.",
                  },
                },
                required: ["professional", "storytelling", "inspirational"],
              },
              headlines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "5 highly tailored LinkedIn headline/tagline options for their profile header.",
              },
              hashtags: {
                type: Type.OBJECT,
                properties: {
                  niche: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "5 highly relative niche hashtags.",
                  },
                  trending: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "5 trending professional hashtags.",
                  },
                },
                required: ["niche", "trending"],
              },
              engagementStrategy: {
                type: Type.OBJECT,
                properties: {
                  bestPostingTime: {
                    type: Type.STRING,
                    description: "The absolute best posting time with brief logical reasoning based on key engagement windows.",
                  },
                  firstCommentIdea: {
                    type: Type.STRING,
                    description: "A conversation-starting prompt to post in the first comment (boosts visibility).",
                  },
                  audienceToTag: {
                    type: Type.STRING,
                    description: "Specific types of LinkedIn accounts, partners, or peers to tag or mention to trigger network effects.",
                  },
                  tactics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 highly tactical, actionable engagement guidelines tailored specifically for this post.",
                  },
                },
                required: ["bestPostingTime", "firstCommentIdea", "audienceToTag", "tactics"],
              },
              brandAnalysis: {
                type: Type.OBJECT,
                properties: {
                  keyStrengths: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 key professional strengths highlighted in this branding alignment.",
                  },
                  keywords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "5 high-impact keywords for SEO search optimization.",
                  },
                  pillars: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 major content pillars for sustainable publishing consistency.",
                  },
                },
                required: ["keyStrengths", "keywords", "pillars"],
              },
              contentCalendar: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: "e.g., 'Day 1', 'Day 2' through 'Day 7'" },
                    title: { type: Type.STRING, description: "The content title/topic" },
                    description: { type: Type.STRING, description: "Brief overview of what to write" },
                    keyMessage: { type: Type.STRING, description: "The core takeaway for the audience" },
                  },
                  required: ["day", "title", "description", "keyMessage"],
                },
                description: "7 distinct calendar ideas representing future content consistency.",
              },
              profileSuggestions: {
                type: Type.OBJECT,
                properties: {
                  headline: {
                    type: Type.STRING,
                    description: "Practical optimization steps specifically targeted to Headline structure.",
                  },
                  about: {
                    type: Type.STRING,
                    description: "A customized About section template written specifically for this user's profile.",
                  },
                  featured: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 high-impact featured items (e.g., particular PDFs, newsletters, post templates) to feature.",
                  },
                },
                required: ["headline", "about", "featured"],
              },
            },
            required: [
              "primaryPost",
              "alternatives",
              "headlines",
              "hashtags",
              "engagementStrategy",
              "brandAnalysis",
              "contentCalendar",
              "profileSuggestions",
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("Received empty response from Gemini API.");
      }

      const generatedData = JSON.parse(text);
      return res.json(generatedData);
    } catch (error: any) {
      console.error("Branding generation error:", error);
      return res.status(500).json({
        error: error.message || "An unexpected error occurred during copy generation.",
      });
    }
  });

  // Serve static UI / Dev Server integrations
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PersonalBrand AI] Server is now running at http://localhost:${PORT}`);
  });
}

startServer();
