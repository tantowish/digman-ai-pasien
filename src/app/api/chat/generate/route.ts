import { PROMPTRESUME } from '@/lib/prompts';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try{
        const { messages } = await req.json();

        const newMessages = [
            ...messages,
            {
                id: new Date().toISOString(),
                role: 'user',
                content: PROMPTRESUME
            }
        ]
        // console.log(newMessages)

        const { text } = await generateText({
            model: openai('gpt-4o'),
            system: PROMPTRESUME,
            messages: newMessages
          });

        return NextResponse.json(
            { success: true, message: "Berhasil resume", data: {text: text} },
            { status: 200 }
        );
    } catch(error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Something went wrong!' },
            { status: 500 }
          );
    }
}
