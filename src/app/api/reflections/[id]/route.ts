/* eslint-disable @typescript-eslint/ban-ts-comment */
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";


const UpdateReflectionSchema = z.object({
  content: z.string().min(1),
  isUrdu: z.boolean().optional(),
  isPublic: z.boolean().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore
    const id = (await params).id;

    const reflection = await prisma.reflection.findUnique({
      where: { id },
    });

    if (!reflection) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    // Ensure ownership
    if (reflection.userId !== session.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(reflection);
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore
    const id = (await params).id;
    const body = await req.json();
    const result = UpdateReflectionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid inputs" }, { status: 400 });
    }

    // Check ownership
    const existing = await prisma.reflection.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== session.userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const updated = await prisma.reflection.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating reflection:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-ignore
    const id = (await params).id;

    // Check ownership
    const existing = await prisma.reflection.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== session.userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.reflection.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reflection:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
