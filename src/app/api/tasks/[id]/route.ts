import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  const { id, name, description, dueDate, status } = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { name, description, dueDate, status },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}