import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import * as z from "zod";

const ToggleBookmarkSchema = z.object({
  lessonId: z.number(),
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.userId },
      include: { lesson: true }, // Include lesson details
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = ToggleBookmarkSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    const { lessonId } = result.data;

    // Check if valid lesson
    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Toggle: Check if exists
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_lessonId: {
          userId: session.userId,
          lessonId,
        },
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ bookmarked: false });
    } else {
      await prisma.bookmark.create({
        data: {
          userId: session.userId,
          lessonId,
        },
      });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
