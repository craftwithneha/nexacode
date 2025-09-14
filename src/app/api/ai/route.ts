import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: "Invalid prompt provided" },
        { status: 400 }
      );
    }

    if (!env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 503 }
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Updated to current model
        messages: [
          { role: "system", content: "You are a helpful AI code assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq API error:", data);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: data.choices?.[0]?.message?.content || "No response from AI.",
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
