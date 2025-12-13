import mongoose, { Schema, models } from "mongoose";

const ApartmentSchema = new Schema(
  {
    aimage: { type: String, required: true },
    aprtno: { type: String, required: true },
    flrno: { type: String, required: true },
    block: { type: String, required: true },
    rent: { type: Number, required: true },
    // Track whether the apartment has been booked via an agreement
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Apartment = models.Apartment || mongoose.model("Apartment", ApartmentSchema);
export default Apartment;



