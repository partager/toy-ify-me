import { GoogleGenAI } from "@google/genai";
import type { ToyStyle } from '../types';

// FIX: The API key must be obtained from `process.env.API_KEY` as per the guidelines.
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  // FIX: Updated the error message to correspond to the correct environment variable.
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (dataUrl: string, mimeType: string) => {
  const base64Data = dataUrl.split(',')[1];
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

const buildPrompt = (style: ToyStyle, customPrompt: string) => {
  const customInstruction = customPrompt 
    ? `\n\nUser's custom instructions: "${customPrompt}"\nIncorporate these specific instructions while adhering to the core style.` 
    : '';

  return `
    Transform the subject in this image into a ${style.name} collectible toy figure.
    
    Style specifications: ${style.prompt}
    ${customInstruction}

    General Requirements:
    - Maintain the subject's most distinctive features and identity, adapting them to the chosen toy style.
    - The output should be a high-quality, professional product photography style image of the toy figure.
    - Ensure clean edges, smooth surfaces, and proper lighting that mimics a real-world toy photoshoot.
    - The background should be a clean, neutral studio backdrop (like light grey or a subtle gradient) unless the style specifies otherwise.
    - Do not include any text, logos, or branding on the image or the toy base.
  `;
};

export const generateToyImage = async (
  imageDataUrl: string,
  mimeType: string,
  style: ToyStyle,
  customPrompt: string
): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  const imagePart = await fileToGenerativePart(imageDataUrl, mimeType);
  const textPart = { text: buildPrompt(style, customPrompt) };

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [imagePart, textPart],
    },
  });
  
  // Iterate through parts to find the image, as the response may contain text and image parts.
  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      const imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
      return imageUrl;
    }
  }

  throw new Error("No image was generated in the API response.");
};
