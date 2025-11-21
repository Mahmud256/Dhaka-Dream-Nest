// app/api/agreements/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agreement from "@/models/Agreement";

export async function GET() {
  try {
    await connectDB();

    const agreements = await Agreement.find()
      .populate("user")
      .populate("apartment");

    return NextResponse.json(agreements, { status: 200 });
  } catch (error) {
    console.error("GET agreements error:", error);
    return NextResponse.json(
      { message: "Failed to fetch agreements" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, apartmentId } = await req.json();

    if (!userId || !apartmentId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Check if user already has a pending/approved agreement
    const existing = await Agreement.findOne({
      user: userId,
      status: { $in: ["pending", "approved"] },
    });

    if (existing) {
      return NextResponse.json(
        { message: "User already has an active agreement!" },
        { status: 400 }
      );
    }

    // Create agreement
    const newAgreement = await Agreement.create({
      user: userId,
      apartment: apartmentId,
      status: "pending",
    });

    return NextResponse.json(newAgreement, { status: 201 });
  } catch (error) {
    console.error("POST agreements error:", error);
    return NextResponse.json(
      { message: "Failed to create agreement" },
      { status: 500 }
    );
  }
}
