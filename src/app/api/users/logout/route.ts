import { connectDB } from "@/db/connectDB";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successfully", success: true },
      { status: 200 }
    );

    response.cookies.delete("token");

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
