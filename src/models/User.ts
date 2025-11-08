import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  image: { type: String },
});

const User = models.User || model("User", UserSchema);
export default User;
