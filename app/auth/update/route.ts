import { NextResponse } from "next/server";
import User2 from "@/models/User2"; // Using the User2 model
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Extract user data from the request
  const {
    totalScore,
    currentLevel,
    tapCount,
    name,
    fiverrName,
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

 

  // Update user data in the database using Sequelize
  const [affectedCount] = await User2.update(
    { totalScore, currentLevel, tapCount, name, fiverrName, themeColor, profilePicture },
    {
      where: { id: decoded.payload.id } // Use Sequelize's where clause to find the user by ID
    }
  );

  if (affectedCount === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
