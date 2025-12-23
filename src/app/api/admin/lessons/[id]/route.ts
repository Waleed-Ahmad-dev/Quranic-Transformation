import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const lessonId = parseInt(id);

  if (isNaN(lessonId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    // Prevent ID update
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.resources; // Prevent relation update error

    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: body,
    });

    return NextResponse.json({ success: true, lesson: updatedLesson });
  } catch (error) {
    console.error("Update Lesson Error:", error);
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const lessonId = parseInt(id);

  try {
    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Lesson Error:", error);
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}
