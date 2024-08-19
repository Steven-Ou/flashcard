import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import Stripe from 'stripe'


const SystemPrompt =`
  You are a flashcard creator:
1. Identify Key Concepts: Start by identifying the main topics and key concepts that need to be covered. This could be based on a textbook, lecture notes, or any other study material.
2. Create Clear Questions and Answers: For each key concept, create a clear and concise question. The answer should be equally clear and to the point. Avoid overly complex language to ensure the information is easily digestible.
3. Use Visual Aids: Incorporate images, diagrams, or charts where applicable. Visual aids can help reinforce the material and make it easier to remember.
4. Organize by Topic: Group flashcards by topic or chapter to make studying more structured. This helps in focusing on one area at a time and makes it easier to find specific information.
5. Include Examples: Where possible, include examples to illustrate the concept. Examples can help in understanding how to apply the information in different contexts.
6. Review and Revise: Regularly review and update the flashcards to ensure they remain accurate and relevant. This is especially important for subjects that evolve over time, like technology or medicine.
7. Test Yourself: Use the flashcards to test your knowledge. Shuffle them to ensure you can recall information out of order, which helps in better retention.
8. Share and Collaborate: Share your flashcards with classmates or study groups. Collaboration can provide new insights and help fill in any gaps in your understanding.

By following this guide, aim to create a comprehensive and effective set of flashcards that enhances your understanding and retention of the subject matter, ultimately leading to improved performance in exams and assessments.

Return in the following JSON format
{
    "flashcards":[
     {
       "front": str,
       "back": str,
     } 
    ]
}
`;


export async function POST(req) {
  try{
  const openai = OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY, // Use process.env to access environment variables securely
    defaultHeaders: {
      "HTTP-Referer": 'http://localhost:3000/', // Optional, for including your app on openrouter.ai rankings.
      "X-Title": 'NameofAI_BOT', // Optional. Shows in rankings on openrouter.ai.
    }
  })
  const data = await req.text()
  console.log("Request data:", data); // Log the request data for debugging

   // Validate that data is an array
   if (!Array.isArray(data)) {
    throw new Error("Invalid input: data should be an array of messages.");
  }

  const completion = await openai.chat.completion.create({
    messages: [
      {role: 'system', content: SystemPrompt},
      {role: 'user', content:data },
    ],
    model: 'gpt-4o',
    response_format: {type: 'json_object'},
  })
} catch (error) {
  console.error("Error in POST /api/chat:", error); // Log the error for debugging
  return NextResponse.json({ error: error.message }, { status: 400 }); // Return a 400 Bad Request response with the error message
}
// Create a ReadableStream to handle the streaming response
const stream = new ReadableStream({
  async start(controller) {
    const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
    try {
      // Iterate over the streamed chunks of the response
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
        if (content) {
          const text = encoder.encode(content); // Encode the content to Uint8Array
          controller.enqueue(text); // Enqueue the encoded text to the stream
        }
      }
    } catch (err) {
      controller.error(err); // Handle any errors that occur during streaming
    } finally {
      controller.close(); // Close the stream when done
    }
  },
});

  const flashcards = JSON.parse(completion.choices[0].message.content)
  
  return NextResponse.json(flashcards.flashcards)



}