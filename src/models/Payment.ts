// src/models/Payment.ts
import mongoose, { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  stripeSessionId: { type: String },
  receiptUrl: { type: String }, // Store receipt URL or PDF path
  paymentDate: { type: Date, default: Date.now },
});

const Payment = models.Payment || model("Payment", PaymentSchema);
export default Payment;
