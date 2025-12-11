import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";


export async function GET() {
  try {
    const session = await getSession();
    const isAdmin = session?.role === "ADMIN";

    const lessons = await prisma.lesson.findMany({
      orderBy: { id: "asc" },
      where: isAdmin ? {} : { minRole: "USER" },
    });
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
