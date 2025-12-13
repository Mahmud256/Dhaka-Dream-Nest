// src/app/api/agreements/confirm/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Agreement from "@/models/Agreement";
import Apartment from "@/models/Apartment";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const { userId, apartmentId, amount, stripeSessionId } = await req.json();

    if (!userId || !apartmentId || !amount || !stripeSessionId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    session.startTransaction();

    const apartment = await Apartment.findById(apartmentId).session(session);
    if (!apartment) throw new Error("Apartment not found");
    if (apartment.isBooked) throw new Error("Apartment already booked");

    const existing = await Agreement.findOne({
      user: userId,
      apartment: apartmentId,
    }).session(session);

    if (existing) throw new Error("Agreement already exists");

    apartment.isBooked = true;
    await apartment.save({ session });

    const agreement = await Agreement.create(
      [
        {
          user: userId,
          apartment: apartmentId,
          status: "completed",
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          user: userId,
          apartment: apartmentId,
          amount,
          status: "completed",
          stripeSessionId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message: "Booking confirmed", agreement, payment },
      { status: 200 }
    );
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return NextResponse.json(
      { message: error.message || "Booking failed" },
      { status: 500 }
    );
  }
}
