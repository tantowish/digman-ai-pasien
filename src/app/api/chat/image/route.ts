import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '@ai-sdk/anthropic';
import { getPromptImage } from '@/lib/prompts';

export async function POST(req: NextRequest) {
    try{
        const { type, image } = await req.json();

        const { text } = await generateText({
            model: openai('gpt-4-turbo'),
            system: getPromptImage(type),
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: 'image',
                            image: new URL(`https://storage.googleapis.com/digman-dev/${image}`).toString()
                        }
                    ]
                }
            ]
          });

        return NextResponse.json(
            { success: true, message: "Berhasil menganalisis", data: {text: text} },
            { status: 200 }
        );
    } catch(error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Something went wrong!' },
            { status: 500 }
          );
    }
}
