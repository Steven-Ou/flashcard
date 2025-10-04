import { NextResponse } from "next/server";
import OpenAI from "openai";

const SystemPrompt = `
  You are an expert study assistant. Based on the user's notes, you will generate the requested study materials.

  If the user requests 'flashcards', provide a JSON object with a "flashcards" key, containing an array of objects, each with a "front" and "back" string.

  If the user requests 'test', provide a JSON object with a "questions" key, containing an array of questions. Each question should be an object with a "question" string, an "answer" string, a "hint" string, and an optional "options" array for multiple-choice questions.

  If the user requests 'guide', provide a JSON object with a "guide" key, containing a string with a summarized study guide.

  Return ONLY the JSON object.
`;

export async function POST(req) {
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000/",
        "X-Title": "Flashcard AI",
      },
    });

    const { notes, type } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SystemPrompt },
        {
          role: "user",
          content: `Generate ${type} from these notes: ${notes}`,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/generate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
