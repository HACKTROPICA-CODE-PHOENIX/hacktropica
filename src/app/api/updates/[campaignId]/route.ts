import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ campaignId: string }> }) {
  try {
    const { campaignId } = await params;
    const db = (await clientPromise).db("hacktropica");
    
    const updates = await db.collection("updates")
      .find({ campaignId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, updates }, { status: 200 });

  } catch (error) {
    console.error("Fetch updates error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}