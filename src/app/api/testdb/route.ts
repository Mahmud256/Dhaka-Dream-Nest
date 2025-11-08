import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();

    // Get database name and collection name from the Mongoose model
    const activeDatabase = db.connection.db.databaseName;
    const userCollection = User.collection.collectionName;

    // Count users in that collection
    const userCount = await User.countDocuments();

    return NextResponse.json({
      message: "✅ MongoDB connection info",
      database: activeDatabase,
      collection: userCollection,
      userCount,
    });
  } catch (error) {
    console.error("❌ Error checking DB:", error);
    return NextResponse.json({ error: "Database check failed" }, { status: 500 });
  }
}
