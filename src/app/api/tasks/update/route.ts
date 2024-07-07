import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}