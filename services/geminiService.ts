
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getRepairAdvice(appliance: string, symptom: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User has a problem with their ${appliance}. Symptom: ${symptom}. 
      Give a professional advice as Bang Ipul, an expert electronic technician in Indonesia. 
      Keep it friendly, helpful, and suggest bringing it to the shop if it's dangerous. 
      Use Indonesian language.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, asisten pintar sedang sibuk. Silakan langsung hubungi Bang Ipul via WhatsApp.";
  }
}

export async function generateProductDescription(productName: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a compelling product description for a second-hand electronic item: ${productName}. 
      Include highlights about reliability and Bang Ipul's verified quality. Language: Indonesian.`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
