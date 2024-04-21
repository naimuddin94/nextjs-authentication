import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const user = await User.find({});
    return NextResponse.json(
      { message: "Fetched successfully", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
