import { NextResponse } from "next/server";
import User2 from "@/models/User2"; // Using the User2 model
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs";

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

  let profilePicturePath = '';
  if (profilePicture) {
    const MAX_SIZE_BYTES = 3 * 1024 * 1024;
    const matches = profilePicture.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
     // Check the size of the image
     if (buffer.length > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Image size exceeds 3 MB limit" }, { status: 400 });
    }
    const fileName = `profile_${decoded.payload.id}_${Date.now()}.${extension}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
    if (!fs.existsSync(path.join(process.cwd(), "public", "uploads"))) {
      fs.mkdirSync(path.join(process.cwd(), "public", "uploads"));
    }
    fs.writeFileSync(uploadPath, buffer);
    profilePicturePath = `/uploads/${fileName}`;
  }

  // Update user data in the database using Sequelize
  const [affectedCount] = await User2.update(
    { totalScore, currentLevel, tapCount, name, fiverrName, themeColor, profilePicture:profilePicturePath },
    {
      where: { id: decoded.payload.id } // Use Sequelize's where clause to find the user by ID
    }
  );

  if (affectedCount === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
