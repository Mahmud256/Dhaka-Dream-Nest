// src/app/api/payments/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ message: "Missing userId" }, { status: 400 });

  const payments = await Payment.find({ user: userId })
    .populate("apartment")
    .sort({ paymentDate: -1 });

  return NextResponse.json(payments);
}
