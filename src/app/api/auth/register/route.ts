import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import * as z from "zod";

// Input Validation Schema
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate Input
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    // 2. Check if User Exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 } // 409 Conflict
      );
    }

    // 2.5 Check if User is Banned
    const bannedUser = await prisma.bannedUser.findUnique({
      where: { email },
    });

    if (bannedUser) {
      return NextResponse.json(
        { error: "This email is banned from registration." },
        { status: 403 }
      );
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        xp: 0,
        currentStreak: 0,
      },
    });

    // 5. Generate Token & Send Email
    const verificationToken = await generateVerificationToken(newUser.email!);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return NextResponse.json(
      { success: true, message: "User registered. Please check your email." },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}