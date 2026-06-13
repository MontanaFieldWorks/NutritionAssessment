import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Configure it in AI Studio secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// REST API for Gemini Nutrition analysis
app.post("/api/analyze-nutrition", async (req, res) => {
  try {
    const { clientName, goal, tdee, weight, daysData } = req.body;

    if (!daysData || !Array.isArray(daysData)) {
      res.status(400).json({ error: "Missing or invalid daysData array." });
      return;
    }

    const ai = getGeminiClient();

    // Summarize the training inputs to pass to Gemini
    const systemPrompt = `You are a world-class, friendly, and practical personal trainer and nutrition coach.
Analyze the client's food journal, macronutrient split, and calorie intake against their Target Daily Energy Expenditure (TDEE) and active fitness goal.
Provide encouraging, specific, and actionable advice in a warm, simple, highly conversational, and natural tone.
CRITICAL TONE DIRECTIVES:
- Do NOT use dry, scientific, textbook, or overly clinical terms. Avoid phrases like "muscle nitrogen retention Goals", "nitrogen retention", "tissue reduction", "metabolic window", "kidney clearance", "caloric compliance", or "energy output thresholds".
- Instead, speak like a real, supportive human trainer would talk to a client at the gym (e.g., "keep your muscles strong and recovered", "lose weight steadily and safely", "save your carbs for surrounding your workouts so you have plenty of gym energy", "drink enough water so you stay energized").
- Point to specific foods in their actual meal log (like pointing to snack bars or bread) and suggest simple, easy-to-understand substitutions.`;

    const userPrompt = `
Client Name: ${clientName || "Client"}
Current Weight: ${weight || "N/A"} lbs
Client Goal: ${goal || "Goal"}
Client TDEE: ${tdee || 2000} kcal

Nutrition Log Summary:
${daysData.map((d: any) => `Date: ${d.date}
  Total Cal: ${d.calories} kcal
  Protein: ${d.protein}g (${d.proteinPct}%)
  Carbs: ${d.carbs}g (${d.carbsPct}%)
  Fat: ${d.fat}g (${d.fatPct}%)
  Logged Foods: ${(d.meals || []).map((m: any) => `${m.name} (${m.calories} cal, P:${m.protein}g C:${m.carbs}g F:${m.fat}g)`).join(", ")}
`).join("\n")}

Please return a comprehensive coaching analysis using the specified JSON schema. Keep values direct, highly professional, elite fitness coaching style, and with zero marketing fluff. Refer specifically to elements in their list.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            macroBreakdownFeedback: {
              type: Type.STRING,
              description: "Direct feedback on their macro distribution (Protein, Carbs, Fats) relative to their target split. Comment on whether they hit targets and suggestions for improvement.",
            },
            calorieAssessment: {
              type: Type.STRING,
              description: "Direct analysis of their total calorie intake compared to their TDEE and active goal. State if they are in an appropriate deficit/surplus or maintenance, and calculate their average variance.",
            },
            practicalRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4-5 specific, practical tips regarding portioning, hydration, protein timing, or whole food shifts.",
            },
            menuSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 strategic substitutions recommending shifting specific processed items (like snack bars or sweet yogurts) in their actual log to high-nutrient alternatives.",
            },
            coachingSummary: {
              type: Type.STRING,
              description: "A professional, highly encouraging 3-4 sentence coaching message summarizing their performance and reinforcing their commitment to their fitness milestone.",
            },
          },
          required: [
            "macroBreakdownFeedback",
            "calorieAssessment",
            "practicalRecommendations",
            "menuSuggestions",
            "coachingSummary",
          ],
        },
      },
    });

    const parsedResponse = JSON.parse(response.text || "{}");
    res.json(parsedResponse);
  } catch (error: any) {
    console.error("Gemini nutrition analysis failed:", error);
    res.status(500).json({
      error: "Failed to generate AI recommendations",
      details: error.message || String(error),
    });
  }
});

// Configure Vite or Static File Serving
async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
