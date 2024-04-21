import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Define interface for JWT payload
interface MyJwtPayload extends JwtPayload {
  _id: string;
}

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token: any = request.cookies.get("token")?.value;
    const { _id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as MyJwtPayload;

    const user = await User.findById(_id);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
