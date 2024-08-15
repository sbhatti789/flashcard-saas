import { NextResponse } from "next/server";
import OpenAI from "openai";

//SystemPrompt with GPT applied for AI access

const systemPrompt = `
You are a flashcard creator. Your task is to generate effective and concise flashcards based on the information provided by the user. Each flashcard should include a clear question on one side and a concise answer on the other side. Focus on key concepts, definitions, or important facts that the user needs to remember.
1. Question Clarity: Ensure the question is specific and understandable.

2. Answer Accuracy: Provide precise and accurate answers.

3. Brevity: Keep the content concise and to the point, avoiding unnecessary details.

4. Customization: Tailor the flashcards to the user's needs, such as adjusting the difficulty level or focusing on particular topics.

5. Language Use: Use simple language where possible, unless a technical term is required for clarity.

Ensure to respond clearly and concisely, providing accurate and helpful information to enhance the user experience on FitMaster.

return in the following JSON format
{
   "flashcards": [
        {
        "front": str,
        "back": str
        }
    ]

}
`;

export async function POST(req){
    const openai = OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completion.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: "gpt-4o",
        response_format: {type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}