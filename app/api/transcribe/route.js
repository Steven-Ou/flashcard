import { NextResponse } from "next/server";
import {AssemblyAI} from 'assemblyai';

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export async function POST(req){
    try{
        const formData = await req.formData();
        const file = formData.get('file');

        if(!file){
            return NextResponse.json({error: 'No file uploaded'},{status:400});
        }

        const audioBuffer = Buffer.from(await file.arrayBuffer());

        const transcript = await client.transcripts.create({

        });
    }
}