//POST, GET

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Apartment from "@/models/Apartment";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newApartment = await Apartment.create(body);

    return NextResponse.json(
      { message: "Apartment created", apartment: newApartment },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create apartment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const apartments = await Apartment.find({});
    return NextResponse.json(apartments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch apartments" },
      { status: 500 }
    );
  }
}
