import { GoogleGenAI, Type } from "@google/genai";
import { Condition, Category } from "../types";

// Note: In a real app, API_KEY should be handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GeneratedListing {
  title: string;
  description: string;
  estimatedYear: string;
  suggestedPrice: number;
  conditionEval: string;
}

export const generateProductListing = async (
  rawNotes: string,
  category: Category
): Promise<GeneratedListing | null> => {
  try {
    const prompt = `
      Jsi expert na starožitný porcelán. Mám produkt v kategorii "${category}".
      Moje poznámky k produktu: "${rawNotes}".
      
      Prosím vytvoř:
      1. Atraktivní prodejní titulek (česky).
      2. Profesionální popis produktu pro e-shop, který zdůrazní historii a krásu (česky, cca 2-3 věty).
      3. Odhad roku výroby (pokud nelze přesně, odhadni dekádu nebo styl).
      4. Doporučenou cenu v CZK (jen číslo).
      5. Zhodnocení stavu (krátká fráze).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            estimatedYear: { type: Type.STRING },
            suggestedPrice: { type: Type.NUMBER },
            conditionEval: { type: Type.STRING }
          },
          required: ["title", "description", "estimatedYear", "suggestedPrice", "conditionEval"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedListing;
    }
    return null;
  } catch (error) {
    console.error("Error generating listing:", error);
    return null;
  }
};