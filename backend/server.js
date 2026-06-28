
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const conversations = {};

const MAX_MESSAGES = 20;
const multer = require("multer");

require("dotenv").config();
const connectDB = require("./db");


const express = require("express");
const cors = require("cors");

const app = express();
connectDB();
const upload = multer({
    storage: multer.memoryStorage()
});
app.use(cors());
app.use(express.json());


async function searchWeb(query) {

    try {

        const response = await axios.post(
            "https://api.tavily.com/search",
            {
                api_key: process.env.TAVILY_API_KEY,
                query: query,
                search_depth: "basic",
                max_results: 5
            }
        );

        const results = response.data.results || [];

        return results.map(item =>
            `Title: ${item.title}
Content: ${item.content}`
        ).join("\n\n");

    } catch (error) {

        console.error("Tavily Error:", error);

        return "";

    }

}
app.post("/chat", upload.single("image")
, async (req, res) => {
    try {
        const userMessage = req.body.message || "";
        
        const msg = userMessage.toLowerCase();

const needsWebSearch =
    msg.includes("latest") ||
    msg.includes("today") ||
    msg.includes("news") ||
    msg.includes("current") ||
    msg.includes("recent") ||
    msg.includes("who won") ||
    msg.includes("weather") ||
    msg.includes("score") ||
    msg.includes("price");
const userId =
    req.body.userId || "default";

if (!conversations[userId]) {
    conversations[userId] = [];
}

let imageContent = null;

if (req.file) {

    console.log("📸 Image received!");

    const base64Image =
        req.file.buffer.toString("base64");

    imageContent = {
        type: "image_url",
        image_url: {
            url: `data:${req.file.mimetype};base64,${base64Image}`
        }
    };
}
conversations[userId].push({
    role: "user",
    content: imageContent
        ? [
            {
                type: "text",
                text: userMessage
            },
            imageContent
        ]
        : userMessage
});

if (conversations[userId].length > MAX_MESSAGES) {
    conversations[userId] =
        conversations[userId].slice(-MAX_MESSAGES);
}
let webInfo = "";

if (needsWebSearch) {

    console.log("🌍 Searching Tavily...");

    webInfo = await searchWeb(userMessage);

    console.log(webInfo);

}

    const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
Today is ${new Date().toDateString()}.

Current year: ${new Date().getFullYear()}.

${webInfo ? `
LATEST WEB INFORMATION:

${webInfo}

Use the web information above when answering.
` : ""}

ACT NATURALLY LIKE A HUMAN BEST FRIEND WOULD REACT IN A FUNNY MANNER.
`
                },
                ...conversations[userId]
            ]
        })
    }
);

const data = await response.json();

console.log("=================================");
console.log("HTTP Status:", response.status);
console.log(JSON.stringify(data, null, 2));
console.log("=================================");

if (!response.ok || data.error) {
    return res.status(response.status).json({
        reply: data.error?.message || "OpenRouter request failed."
    });
}

const friendReply = data.choices?.[0]?.message?.content;

if (!friendReply) {
    return res.status(500).json({
        reply: "No response returned from OpenRouter."
    });
}

conversations[userId].push({
    role: "assistant",
    content: friendReply
});
      res.json({
    reply: friendReply
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reply: "Sorry... Friend is having trouble thinking right now."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🌸 Friend is running on port ${PORT}`);
});