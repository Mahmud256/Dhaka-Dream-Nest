import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Agreement from "@/models/Agreement";
import Apartment from "@/models/Apartment";

export async function POST(req: Request) {
  const session = await mongoose.startSession();

  try {
    await connectDB();
    const { userId, apartmentId } = await req.json();
    if (!userId || !apartmentId) return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    session.startTransaction();

    const payment = await Payment.findOne({ user: userId, apartment: apartmentId }).session(session);
    if (!payment) throw new Error("Payment record not found");

    if (payment.status === "completed") throw new Error("Payment already confirmed");

    // Mark payment completed
    payment.status = "completed";
    await payment.save({ session });

    // Mark apartment booked
    const apartment = await Apartment.findById(apartmentId).session(session);
    if (!apartment) throw new Error("Apartment not found");
    apartment.isBooked = true;
    await apartment.save({ session });

    // Create agreement
    const agreement = await Agreement.create(
      [{ user: userId, apartment: apartmentId, status: "completed" }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: "Booking confirmed", agreement });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return NextResponse.json({ message: err.message || "Booking failed" }, { status: 500 });
  }
}
