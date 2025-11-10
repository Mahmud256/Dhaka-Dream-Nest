import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST /api/signup
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const db = await connectDB();
    console.log("✅ MongoDB Connected:", db.connection.readyState); // Add this line

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // 👈 add this
    });


    console.log("✅ User Created:", newUser);

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// GET /api/signup
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// DELETE /api/signup — Delete user by ID
export async function DELETE(req: Request) {
  try {
    await connectDB();

    // ✅ Get userId from query string (better for Postman GET-like request)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required in query (e.g. ?userId=...)" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "✅ User deleted successfully", user: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
