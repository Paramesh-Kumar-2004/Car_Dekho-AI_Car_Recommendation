// import fetch from "node-fetch";

// const MODEL = "gemini-2.5-flash";

// export async function getGeminiResponse(prompt) {

//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//     console.log("Using Gemini Key:",GEMINI_API_KEY?.substring(0, 10));

//     try {

//         const response = await fetch(
//             `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type":
//                         "application/json",
//                 },
//                 body: JSON.stringify({
//                     contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: prompt,
//                                 },
//                             ],
//                         },
//                     ],
//                 }),
//             }
//         );

//         const data =
//             await response.json();

//         // console.log("Gemini Response:",JSON.stringify(data, null, 2));

//         if (data.error) {
//             throw new Error(
//                 data.error.message
//             );
//         }

//         return (
//             data?.candidates?.[0]
//                 ?.content?.parts?.[0]
//                 ?.text || ""
//         );

//     } catch (error) {

//         console.error(
//             "Gemini Error:",
//             error
//         );

//         throw error;
//     }
// }




import fetch from "node-fetch";

const MODEL = "gemini-2.5-flash";

export async function getGeminiResponse(prompt) {

    const GEMINI_API_KEY =
        process.env.GEMINI_API_KEY;

    const maxRetries = 3;

    for (let attempt = 1;
        attempt <= maxRetries;
        attempt++) {

        try {

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            const data =
                await response.json();

            if (data.error) {

                if (
                    data.error.message.includes(
                        "high demand"
                    ) &&
                    attempt < maxRetries
                ) {

                    console.log(
                        `Retry ${attempt}`
                    );

                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                3000
                            )
                    );

                    continue;
                }

                throw new Error(
                    data.error.message
                );
            }

            return data
                ?.candidates?.[0]
                ?.content?.parts?.[0]
                ?.text || "";

        } catch (error) {

            const fallbackCars = [
                {
                    name: "Tata Nexon",
                    reason: "High safety rating",
                    approx_price_range: "₹8L - ₹14L"
                },
                {
                    name: "Hyundai Creta",
                    reason: "Popular family SUV",
                    approx_price_range: "₹11L - ₹18L"
                },
                {
                    name: "Toyota Hyryder",
                    reason: "Excellent mileage",
                    approx_price_range: "₹12L - ₹20L"
                }
            ];

            return JSON.stringify(fallbackCars);
        }
    }
}