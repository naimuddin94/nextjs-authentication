import { connectDB } from "@/db/connectDB";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // TODO: validation

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Remove password field from the response
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    // send mail verification
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id.toString(),
    });

    return NextResponse.json({
      message: "User created successfully",
      data: userWithoutPassword,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
