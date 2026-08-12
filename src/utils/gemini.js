import { GoogleGenAI } from '@google/genai';

// Initialize the API with the key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let ai = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateEventIdeas = async (prompt, attachments = []) => {
  if (!ai) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  try {
    const parts = [{ text: prompt }];

    // Add attachments to parts if any
    for (const file of attachments) {
      if (file.type.startsWith('image/')) {
        parts.push({
          inlineData: {
            data: file.base64,
            mimeType: file.type
          }
        });
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          role: 'user',
          parts
        }
      ],
      config: {
        systemInstruction: "You are EventGenie AI, a helpful event planning assistant. Your job is to help users plan events, suggest ideas based on their input or images, parse social media links to understand trends, and offer creative event themes and budgeting advice."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate a response. Please try again.");
  }
};
