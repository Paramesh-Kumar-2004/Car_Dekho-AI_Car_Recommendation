import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("API KEY:", GEMINI_API_KEY);

async function testGemini() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Say Hello",
                },
              ],
            },
          ],
        }),
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log(
      JSON.stringify(data, null, 2)
    );

  } catch (error) {
    console.error("ERROR:", error);
  }
}


testGemini();