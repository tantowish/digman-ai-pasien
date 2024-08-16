import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { PROMPTRESUME } from '@/lib/prompts';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createAnthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
    try{
        const { messages, link } = await req.json();   
        console.log(link)
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

        const newMessages = [
            ...messages,
            {
                id: new Date().toISOString(),
                role: 'user',
                content: PROMPTRESUME
            }
        ]

        if(model == "chatgpt"){
            if(!api_key){
                return new NextResponse('Missing Openai API Key.', {status: 400})
            }
            const openai = createOpenAI({
                apiKey: api_key
            })
            const { text } = await generateText({
                model: openai('gpt-4o'),
                system: PROMPTRESUME,
                messages: newMessages
              });
            response = text
        } else if(model == "gemini"){
            if(!api_key){
                return new NextResponse('Missing Gemini API Key.', {status: 400})
            }
            const google = createGoogleGenerativeAI({
                apiKey: api_key
            })
            const { text } = await generateText({
                model: google('models/gemini-1.5-pro-latest'),
                system: PROMPTRESUME,
                messages: newMessages
              });
            response = text
        } else if(model == "claude"){
            if(!api_key){
                return new NextResponse('Missing Antrhopic (Claude) API Key.', {status: 400})
            }
            const anthropic = createAnthropic({
                apiKey: api_key
            })
            const { text } = await generateText({
                model: anthropic('claude-3-5-sonnet-20240620'),
                system: PROMPTRESUME,
                messages: newMessages
              });
            response = text
        } else {
            return NextResponse.json(
                { success: false, message: "Model Required" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Berhasil resume", data: {text: response} },
            { status: 200 }
        );
    } catch(error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Something went wrong!' },
            { status: 500 }
          );
    }
}
