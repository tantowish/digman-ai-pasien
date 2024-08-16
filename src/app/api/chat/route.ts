import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
    try{
        const { messages, data } = await req.json();   
        const link = data.link
        console.log(link)
        if (!link || link.trim() === "") {
            return new NextResponse('Link Digman tidak tersedia.', { status: 404 });
        }

        const formData = new FormData();
        formData.append("email", "ai@carigi.id");
        formData.append("password", "password");
        console.log(formData)

        const loginResponse = await fetch(`https://${link}/aiauth/device_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });

        console.log(await loginResponse.json())
        if (!loginResponse.ok) {
            throw new Error('Login request failed');
        }

        const loginResult = await loginResponse.json();
        const api_key = loginResult.tokenAi;
        const model = "chatgpt";
        console.log(api_key)

        if(model == 'chatgpt'){
            if(!process.env.OPENAI_API_KEY){
                return new NextResponse('Missing Openai API Key.', {status: 400})
            }

            console.log('Getting GPT response')
            const response = await streamText({
                model: openai('gpt-4o'),
                messages,
            });

            return response.toDataStreamResponse()
        }
        else if(model == 'gemini'){
            if(!process.env.GOOGLE_GENERATIVE_AI_API_KEY){
                return new NextResponse('Missing Gemini API Key.', {status: 400})
            } 

            console.log('Getting Gemini response')
            const response = await streamText({
                model : google('models/gemini-1.5-pro-latest'),
                messages,
            })

            return response.toAIStreamResponse()
        }
        else if(model == 'claude'){
            if(!process.env.ANTHROPIC_API_KEY){
                return new NextResponse('Missing Antrhopic (Claude) API Key.', {status: 400})
            } 

            console.log('Getting Claude response')
            const response = await streamText({
                model: anthropic('claude-3-5-sonnet-20240620'),
                messages,
            })

            return response.toAIStreamResponse()
        }
        else {
            return new NextResponse('Model required.', {status: 400})
        }
    } catch(error: any) {
        return new NextResponse(error.message || 'Something went wrong!', {
            status: 500
        })
    }
}