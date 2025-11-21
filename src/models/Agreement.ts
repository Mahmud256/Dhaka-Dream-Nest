import mongoose, { Schema, models } from "mongoose";

const AgreementSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    apartment: { type: Schema.Types.ObjectId, ref: "Apartment", required: true },

    // 🔥 You use "completed" in UI, so add it here
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Agreement =
  models.Agreement || mongoose.model("Agreement", AgreementSchema);

export default Agreement;
