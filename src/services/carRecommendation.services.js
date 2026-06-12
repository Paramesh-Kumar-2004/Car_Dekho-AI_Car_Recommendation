import { getGeminiResponse } from "./gemini.js";

export async function recommendCars(preferences, cars) {
  const prompt = `
You are an expert car recommendation assistant.

User Preferences:
${JSON.stringify(preferences, null, 2)}

Available Cars:
${JSON.stringify(cars, null, 2)}

Select the BEST 3 cars.

Return ONLY valid JSON.

Example:

{
  "recommendedCars": [
    "Tata Nexon",
    "Hyundai Creta",
    "Toyota Hyryder"
  ]
}
`;

  const result = await getGeminiResponse(prompt);

  const cleaned = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}