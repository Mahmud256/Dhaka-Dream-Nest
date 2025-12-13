import mongoose, { Schema, model, models } from "mongoose";

interface IAgreement {
  user: mongoose.Schema.Types.ObjectId;
  apartment: mongoose.Schema.Types.ObjectId;
  status: "pending" | "completed" | "cancelled";
}

const AgreementSchema = new Schema<IAgreement>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    apartment: { type: Schema.Types.ObjectId, ref: "Apartment", required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

const Agreement = models.Agreement || model("Agreement", AgreementSchema);

export default Agreement;
