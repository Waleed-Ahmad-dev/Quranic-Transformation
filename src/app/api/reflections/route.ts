import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import * as z from "zod";

const CreateReflectionSchema = z.object({
  lessonId: z.number(),
  content: z.string().min(1),
  isUrdu: z.boolean().optional(),
  isPublic: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reflections = await prisma.reflection.findMany({
      where: { userId: session.userId },
      orderBy: { updatedAt: "desc" },
      include: { lesson: { select: { title: true } } }, // optional: include lesson title
    });

    return NextResponse.json(reflections);
  } catch (error) {
    console.error("Error fetching reflections:", error);
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
    const result = CreateReflectionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    const { lessonId, content, isUrdu, isPublic } = result.data;

    const reflection = await prisma.reflection.create({
      data: {
        userId: session.userId,
        lessonId,
        content,
        isUrdu: isUrdu || false,
        isPublic: isPublic || false,
      },
    });

    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error("Error creating reflection:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
