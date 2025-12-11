import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { email, reason } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if trying to ban an Admin (Prevent banning other admins via this route if they assume account deletion, but this is email ban)
    // We should strictly prevent banning an Admin's email if that email belongs to an existing Admin.
    const targetUser = await prisma.user.findUnique({ where: { email } });
    if (targetUser && targetUser.role === "ADMIN") {
        return NextResponse.json({ error: "Cannot ban an Admin" }, { status: 403 });
    }

    const banned = await prisma.bannedUser.create({
      data: {
        email,
        reason,
        bannedBy: session.userId,
      },
    });

    return NextResponse.json({ success: true, banned });
  } catch (error) {
    console.error("Ban Error:", error);
    return NextResponse.json({ error: "Failed to ban user" }, { status: 500 });
  }
}
