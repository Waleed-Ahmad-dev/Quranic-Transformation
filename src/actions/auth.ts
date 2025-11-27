"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// --- Validation Schemas ---
const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

const ResendSchema = z.object({
  email: z.string().email(),
});

// --- REGISTER ACTION ---
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      // Initialize gamification stats
      xp: 0,
      currentStreak: 0,
    },
  });

  // Generate token and send email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent! Please check your inbox." };
};

// --- RESEND EMAIL ACTION ---
export const resendVerificationEmail = async (values: z.infer<typeof ResendSchema>) => {
  const validatedFields = ResendSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  if (existingUser.emailVerified) {
    return { error: "Email is already verified!" };
  }

  // Generate a NEW token (this invalidates the old one automatically via logic in tokens.ts)
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verification email resent!" };
};