import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';
import { createAnthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
    try{
        const { messages, data } = await req.json();   
        const link = data.link
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

        if(model == 'chatgpt'){
            if(!api_key){
                return new NextResponse('Missing Openai API Key.', {status: 400})
            }

            console.log('Getting GPT response')
            const openai = createOpenAI({
                apiKey: api_key
            })
            const response = await streamText({
                model: openai('gpt-4o'),
                messages,
            });

            return response.toDataStreamResponse()
        }
        else if(model == 'gemini'){
            if(!api_key){
                return new NextResponse('Missing Gemini API Key.', {status: 400})
            } 

            console.log('Getting Gemini response')
            const google = createGoogleGenerativeAI({
                apiKey: api_key
            })
            const response = await streamText({
                model : google('models/gemini-1.5-pro-latest'),
                messages,
            })

            return response.toAIStreamResponse()
        }
        else if(model == 'claude'){
            if(!api_key){
                return new NextResponse('Missing Antrhopic (Claude) API Key.', {status: 400})
            } 

            console.log('Getting Claude response')
            const anthropic = createAnthropic({
                apiKey: api_key
            })
            const response = await streamText({
                model: anthropic('claude-3-5-sonnet-20240620'),
                messages,
            })

            return response.toAIStreamResponse()
        }
        else {
            return NextResponse.json(
                { success: false, message: "Model Required" },
                { status: 400 }
            );
        }
    } catch(error: any) {
        return new NextResponse(error.message || 'Something went wrong!', {
            status: 500
        })
    }
}