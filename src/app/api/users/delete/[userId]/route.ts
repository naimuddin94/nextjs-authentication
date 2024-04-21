import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    const { userId } = context.params;
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User delete successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
