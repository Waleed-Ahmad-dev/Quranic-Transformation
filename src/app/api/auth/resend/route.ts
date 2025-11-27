import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import * as z from "zod";

const ResendSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate Input
    const result = ResendSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // 2. Find User
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // Security: Don't reveal if user exists or not, just say sent
      return NextResponse.json(
        { message: "If account exists, email sent" },
        { status: 200 }
      );
    }

    if (existingUser.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      );
    }

    // 3. Generate NEW Token & Send
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return NextResponse.json(
      { success: true, message: "Verification email sent" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}