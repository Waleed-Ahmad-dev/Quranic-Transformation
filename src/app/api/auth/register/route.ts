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
    console.log("📝 [Register API] Request received");
    const body = await req.json();
    console.log("📝 [Register API] Request body parsed (password hidden):", { ...body, password: "***" });

    // 1. Validate Input
    console.log("📝 [Register API] Validating input...");
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      console.error("❌ [Register API] Input validation failed:", result.error.format());
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }
    console.log("✅ [Register API] Input valid");

    const { email, password, name } = result.data;

    // 2. Check if User Exists
    console.log("📝 [Register API] Checking for existing user...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.warn("⚠️ [Register API] User already exists:", email);
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 } // 409 Conflict
      );
    }

    // 2.5 Check if User is Banned
    console.log("📝 [Register API] Checking ban status...");
    const bannedUser = await prisma.bannedUser.findUnique({
      where: { email },
    });

    if (bannedUser) {
      console.warn("⛔ [Register API] User is banned:", email);
      return NextResponse.json(
        { error: "This email is banned from registration." },
        { status: 403 }
      );
    }

    // 3. Hash Password
    console.log("📝 [Register API] Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    console.log("📝 [Register API] Creating user in database...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        xp: 0,
        currentStreak: 0,
      },
    });
    console.log("✅ [Register API] User created. ID:", newUser.id);

    // 5. Generate Token & Send Email
    console.log("📝 [Register API] Generating verification token...");
    const verificationToken = await generateVerificationToken(newUser.email!);
    
    console.log("📝 [Register API] Sending verification email...");
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    console.log("✅ [Register API] Email sending triggered (async)");

    return NextResponse.json(
      { success: true, message: "User registered. Please check your email." },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("❌ [Register API] Critical Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}