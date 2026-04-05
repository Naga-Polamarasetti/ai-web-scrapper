import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env';

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

export class AIService {
  /**
   * Feeds the image and HTML to Gemini to extract structured JSON data.
   */
  static async extractStructuredData(prompt: string, image: Buffer, html: string) {
    const systemInstruction = `You are an expert data extraction algorithm. 
Your task is to carefully analyze the provided web page screenshot and its corresponding HTML source code, and extract information strictly based on the user's requirements.

- Organize the extracted data into a highly structured, well-formatted JSON object.
- Use clear, descriptive keys. Group related items into logical arrays or nested objects where appropriate.
- If any requested information is not present in the screenshot or source code, omit the field or set it to null.
- Do not include any explanations, markdown wrappers, or conversational text. Return only the raw JSON.

USER REQUIREMENTS:
${prompt}`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemInstruction },
            { text: `Here is the HTML source code of the page:\n\n${html}` },
            {
              inlineData: {
                mimeType: 'image/png',
                data: image.toString('base64'),
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    return result;
  }
}
