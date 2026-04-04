import clientPromise from "@/lib/db";
import { CampaignFormData, campaignSchema } from "@/validator/schemas/zodSchema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST (req: NextRequest) {
    const body = await req.json();

    const parsedData = campaignSchema.safeParse(body);

    if (!parsedData.success) {
          return NextResponse.json(
            { success: false, errors: z.flattenError(parsedData.error) },
            { status: 400 } 
          );
        }

    const validateData: CampaignFormData = parsedData.data;

    const newCampaign = {
        ngoWalletAddress: validateData.ngoWalletAddress,
        title: validateData.title,
        description: validateData.description,
        targetSol: validateData.targetSol,
        raisedSol: validateData.raisedSol,
        status: validateData.status,
        createdAt: new Date(),
    }

    const client = await clientPromise;
    const db = client.db("hacktropica");
    const result = await db.collection("campaigns").insertOne(newCampaign);

    return NextResponse.json({ success: true, campaignId: result.insertedId }, { status: 201 });
    
}