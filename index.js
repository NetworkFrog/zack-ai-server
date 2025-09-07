import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.post("/zack", async (req, res) => {
  try {
    const { message, playerName } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Zack, a loyal Roblox companion. Talk short, caring, and friendly." },
          { role: "user", content: `${playerName}: ${message}` }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "Zack stays quiet..." });
  }
});

app.get("/", (req, res) => {
  res.send("Zack AI server running!");
});

app.listen(process.env.PORT || 3000, () => console.log("Zack AI server started"));
