// const axios=require('axios');
// const {InferenceClient}=require('@huggingface/inference')

// const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
// const MODEL_ID = process.env.HUGGINGFACE_MODEL_ID;

// const apiKey = process.env.HUGGINGFACE_API_KEY
// const client = new InferenceClient(HUGGINGFACE_API_KEY)


// async function generateEmailTemplate(healthData) {
//   try {
//     try {
//       const chatCompletion = await client.chatCompletion({
//         model: "HuggingFaceH4/zephyr-7b-beta",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a professional health assistant. Provide brief, personalized health insights, exercise tips, and diet recommendations in English. Do not include greetings, subject lines, or bullet points. Respond in short, flowing sentences, and include relevant emojis. Keep the entire response under 50 words.",
//           },
//           {
//             role: "user",
//             content: `give me some health insights tips ${healthData}`,
//           },
//         ],
//         provider: "hf-inference",
//         max_tokens: 500,
//       });

//       return chatCompletion.choices[0]?.message.content || "Couldn't generate feedback.";
//     } catch (apiError) {
//       console.error("HuggingFace API Error:", apiError);

//       if (apiError instanceof Error) {
//         console.error("Error message:", apiError.message);
//         console.error("Error stack:", apiError.stack);
//       }

//       return "We couldn't generate feedback at this moment. API error occurred.";
//     }
//   } catch (error) {
//     console.error("Unexpected error in generateAIEmailContent:", error);
//     return "We couldn't generate feedback at this moment.";
//   }
// }

// module.exports = { generateEmailTemplate };


// const axios=require('axios');
// const { InferenceClient } = require('@huggingface/inference');

// const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
// const client = new InferenceClient(HUGGINGFACE_API_KEY);

// // Generates AI-suggested email template/message based on campaign name
// async function generateEmailTemplate(campaignName) {
//   try {
//     const basePrompt = [
//       {
//         role: "system",
//         content:
//           "You're an expert in crafting catchy marketing email one-liners. Generate short, informal, friendly email messages (under 30 words) for a sales campaign. Include placeholder {name} for personalization. Be direct and energetic.",
//       },
//       {
//         role: "user",
//         content: `Give me 5 different short promotional email lines for campaign: ${campaignName}`,
//       },
//     ];

//     const chatCompletion = await client.chatCompletion({
//       model: "HuggingFaceH4/zephyr-7b-beta",
//       messages: basePrompt,
//       provider: "hf-inference",
//       max_tokens: 250,
//     });

//     const content = chatCompletion.choices[0]?.message.content || "";
//     // Split lines into individual suggestions
//     const suggestions = content
//       .split("\n")
//       .map((line) => line.replace(/^[-*\d.]\s*/, "").trim())
//       .filter(Boolean);

//     return suggestions;
//   } catch (error) {
//     console.error("AI Suggestion Error:", error);
//     return [];
//   }
// }

// module.exports = { generateEmailTemplate };


const axios = require('axios');
const { InferenceClient } = require('@huggingface/inference');

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const client = new InferenceClient(HUGGINGFACE_API_KEY);

// Generates AI-suggested email template/message based on campaign name
async function generateEmailTemplate(campaignName) {
  try {
    const basePrompt = [
      {
        role: "system",
        content:
          "You're an expert in crafting catchy marketing email one-liners. Generate short, informal, friendly email messages (under 30 words) for a sales campaign. Do NOT include any placeholder like {name}. Be direct and energetic.",
      },
      {
        role: "user",
        content: `Give me 5 different short promotional email lines for campaign: ${campaignName}`,
      },
    ];

    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: basePrompt,
      provider: "hf-inference",
      max_tokens: 250,
    });

    const content = chatCompletion.choices[0]?.message.content || "";

    // Split lines into clean suggestions
    const suggestions = content
      .split("\n")
      .map((line) => line.replace(/^[-*\d.]\s*/, "").trim())
      .filter(Boolean);

    return suggestions;
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return [];
  }
}

module.exports = { generateEmailTemplate };

