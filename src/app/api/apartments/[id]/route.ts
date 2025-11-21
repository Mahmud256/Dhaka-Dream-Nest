import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Apartment from "@/models/Apartment";
import Agreement from "@/models/Agreement"; // <-- IMPORTANT

// ---------- GET APARTMENT BY ID ----------
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const apartment = await Apartment.findById(id);

    if (!apartment) {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(apartment, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch apartment" },
      { status: 500 }
    );
  }
}

// ---------- UPDATE APARTMENT ----------
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const updated = await Apartment.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Apartment updated", apartment: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update apartment" },
      { status: 500 }
    );
  }
}

// ----------- DELETE APARTMENT (WITH AGREEMENT CHECK) -----------
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    // 🔥 1. Check if any agreement exists for this apartment
    const agreementExists = await Agreement.findOne({ apartmentId: id });

    if (agreementExists) {
      return NextResponse.json(
        { error: "Cannot delete. This apartment is already booked by a member." },
        { status: 400 }
      );
    }

    // 🔥 2. No agreement → delete apartment
    const deleted = await Apartment.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Apartment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete apartment" },
      { status: 500 }
    );
  }
}
