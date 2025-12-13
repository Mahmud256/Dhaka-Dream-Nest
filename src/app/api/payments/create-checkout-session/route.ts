export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import Apartment from "@/models/Apartment";
import Payment from "@/models/Payment";

let stripe: Stripe;

function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY missing");
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

export async function POST(req: Request) {
  try {
    await connectDB();
  } catch {}

  const { apartmentId, userId } = await req.json();

  if (!apartmentId || !userId) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const apartment = await Apartment.findById(apartmentId);
  if (!apartment) {
    return NextResponse.json({ message: "Apartment not found" }, { status: 404 });
  }

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Apartment ${apartment.aprtno} Booking` },
            unit_amount: apartment.rent * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/member?success=true&apartmentId=${apartmentId}&userId=${userId}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/member?success=false`,
    });

    await Payment.create({
      user: userId,
      apartment: apartmentId,
      amount: apartment.rent,
      status: "pending",
      stripeSessionId: session.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Stripe error" }, { status: 500 });
  }
}
