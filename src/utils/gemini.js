import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function getGeminiResponse(prompt) {
  try {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    if (error.message.includes('API key')) {
      return "Error: Please check your Gemini API key configuration.";
    }
    if (error.response?.status === 404) {
      return "Error: Invalid API endpoint or configuration. Please verify your API setup.";
    }
    return "I apologize, but I'm having trouble processing your request right now. Please check the console for more details.";
  }
}