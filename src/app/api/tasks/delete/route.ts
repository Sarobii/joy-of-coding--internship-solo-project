
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}