import clientPromise from "@/lib/db";
import { updateSchema } from "@/validator/schemas/zodSchema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST (req: NextRequest) {
    const body = await req.json();

    const parsedData = updateSchema.safeParse(body);

    if (!parsedData.success) {
        return NextResponse.json(
            { success: false, errors: z.flattenError(parsedData.error) },
            { status: 400 } 
        );
    }

    const validatedData = parsedData.data;

    const client = await clientPromise;
    
    const db = client.db("hacktropica");

    const collection = db.collection("updates");

    const newUpdate = {
        campaignId: validatedData.campaignId,
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        createdAt: new Date(),
    }

    const result = await collection.insertOne(newUpdate);

    return NextResponse.json({ success: true, campaignId: validatedData.campaignId, message: "Update added successfully" }, { status: 201 });
}