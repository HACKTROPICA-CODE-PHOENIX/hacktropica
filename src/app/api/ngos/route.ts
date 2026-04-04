import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const client = await clientPromise;

    const collection = client.db("hacktropica").collection("ngos");
    
    const ngos = await collection.find({}).sort({createdAt: -1}).limit(50).toArray();

    return NextResponse.json({ ngos });
}