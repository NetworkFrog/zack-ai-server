import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/zack", async (req, res) => {
  console.log("📩 Incoming request:", req.body);

  const { message, playerName } = req.body;

  if (!message || !playerName) {
    return res.status(400).json({ reply: "Missing message or playerName" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are Zack, a loyal companion in a Roblox game. You are caring, protective, and emotional. You talk in short sentences. Never break character.`,
          },
          {
            role: "user",
            content: `${playerName}: ${message}`,
          },
        ],
      }),
    });

    const data = await response.json();

    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Zack stays quiet..." });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Zack AI server is running!");
});

app.listen(port, () => {
  console.log(`✅ Zack AI server running on port ${port}`);
});
