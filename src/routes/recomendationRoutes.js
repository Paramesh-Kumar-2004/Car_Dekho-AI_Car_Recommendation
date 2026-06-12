import express from "express";
import { getGeminiResponse } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { budget, fuel, seating } = req.body;

        const prompt = `
Recommend the top 3 cars for the following preferences:

Budget: ${budget}
Fuel Type: ${fuel}
Seating: ${seating}

Return ONLY valid JSON.

Example:
[
  {
    "name": "Tata Nexon",
    "reason": "Best safety rating",
    "approx_price_range": "₹8L - ₹14L"
  }
]
`;

        const result = await getGeminiResponse(prompt);

        const cleaned = result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const recommendations = JSON.parse(cleaned);

        res.status(200).json({
            success: true,
            recommendations
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;