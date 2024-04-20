import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

interface sendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET_PASSWORD";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailProps) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET_PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "515da577717fc5",
        pass: "f5bca5f6a0af12",
      },
    });

    const mailOptions = {
      from: "citycomputersatkhira@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email address"
          : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to 
      ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below sin your browser.
      </br>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
