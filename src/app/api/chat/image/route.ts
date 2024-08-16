import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getPromptImage } from '@/lib/prompts';

export async function POST(req: NextRequest) {
    try{
        const { type, image, link } = await req.json();

        if (!link || link.trim() === "") {
            return new NextResponse('Link Digman tidak tersedia.', { status: 404 });
        }

        const formData = new FormData();
        formData.append("username", "ai@carigi.id");
        formData.append("password", "password");

        const loginResponse = await fetch(`https://${link}/aiauth/device_login`, {
            method: 'POST',
            body: formData
        });

        if (!loginResponse.ok) {
            throw new Error('Login request failed');
        }

        const loginResult = await loginResponse.json();
        const api_key = loginResult.tokenAi;
        const model = "chatgpt";
        console.log(loginResult)
        let response

        if(model == "chatgpt"){
            if(!api_key){
                return new NextResponse('Missing Openai API Key.', {status: 404})
            }
            const openai = createOpenAI({
                apiKey: api_key
            })
            const { text } = await generateText({
                model: openai('gpt-4o'),
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
            response = text
        } else {
            return NextResponse.json(
                { success: false, message: "Model Required" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Berhasil menganalisis", data: {text: response} },
            { status: 200 }
        );
    } catch(error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Something went wrong!' },
            { status: 500 }
          );
    }
}
