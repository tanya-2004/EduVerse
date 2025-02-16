// /backend/utils/summarizer.js
const axios = require("axios");

const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // or any other OpenAI model you want to use
        prompt: `Summarize the following text:\n\n${text}\n\nSummarized version:`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error("Could not summarize the text.");
  }
};

module.exports = summarizeText;
