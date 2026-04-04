import clientPromise from "@/lib/db";
import { donationSchema } from "@/validator/schemas/zodSchema";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {

    const body = await req.json();
    
    const parsedData = donationSchema.safeParse(body);

    if (!parsedData.success) {
        return NextResponse.json(
        { success: false, errors: z.flattenError(parsedData.error) },
        { status: 400 } 
        );
    }

    const validateData = parsedData.data;
    
    const db = (await clientPromise).db("hacktropica");

    const collection = await db.collection("campaigns");

    const updatedSol = await collection.updateOne({
        _id: new ObjectId(validateData.campaignId)
    }, {
        $inc: {
            raisedSol: validateData.amount
        }
    })

    return NextResponse.json({
        success: true,
        message: "Donation recorded successfully"
    })
}