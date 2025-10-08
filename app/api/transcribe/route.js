import { NextResponse } from "next/server";
import {AssemblyAI} from 'assemblyai';

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export async function POST(req){
    try{
        const formData = await req.formData();
    }
}