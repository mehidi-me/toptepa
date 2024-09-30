import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await connectDB();
  const {
    totalScore,
    currentLevel,
    tapCount,
    name,
    themeColor,
    profilePicture,
  } = await req.json();

  // Get token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("auth")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify token
  const decoded: any = await verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find user by ID
  const user = await User.updateOne(
    { _id: decoded.payload.id },
    { totalScore, currentLevel, tapCount, name, themeColor, profilePicture }
  );
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, user: user });
}
