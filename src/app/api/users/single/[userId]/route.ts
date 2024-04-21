import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    const { userId } = context.params;
    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
