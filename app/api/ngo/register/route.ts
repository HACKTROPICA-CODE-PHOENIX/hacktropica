import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/validator/schemas/env";
import { NgoRegistrationFormData, ngoRegistrationSchema } from "@/validator/schemas/zodSchema";
import clientPromise from "@/lib/db";

const genAI = new GoogleGenerativeAI(env.GEMINI_API);

export async function POST(req: NextRequest) {
    const body = await req.json();

    const parsedData = ngoRegistrationSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { success: false, errors: parsedData.error.flatten().fieldErrors },
        { status: 400 } 
      );
    }

    const validatedData: NgoRegistrationFormData = parsedData.data;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // CRITICAL: Force the API to return clean JSON
      generationConfig: { responseMimeType: "application/json" } 
    });

    // 4. Construct your strict prompt
    const prompt = `
      You are an expert fraud detection AI for a Web3 donation platform. 
      Analyze this NGO application and return ONLY a JSON object evaluating its legitimacy.
      
      NGO Data:
      Name: ${validatedData.name}
      Mission: ${validatedData.mission}
      Description: ${validatedData.description}
      Fund Plan: ${validatedData.fundPlan}
      
      Required JSON Schema:
      {
        "verified": boolean,
        "trustScore": number (0-100),
        "reasoning": "short 2-sentence explanation"
      }
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = JSON.parse(result.response.text());

    const client = await clientPromise;

    const db = client.db("hacktropica");

    const newNgoDocument = {
      walletAddress: validatedData.walletAddress,
      profile: {
        name: validatedData.name,
        mission: validatedData.mission,
        description: validatedData.description,
        fundPlan: validatedData.fundPlan,
      },
      verificationStatus: aiResponse, // We just drop the Gemini JSON right in!
      createdAt: new Date(),
    };

    const dbResult = db.collection("ngos").insertOne(newNgoDocument);

    return NextResponse.json({ 
      success: true, 
      message: "NGO Registered and Verified",
      ngoId: (await dbResult).insertedId,
      trustScore: aiResponse.trustScore
    }, { status: 201 }); 

}