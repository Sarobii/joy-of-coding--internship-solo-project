import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort');
  const filter = searchParams.get('filter');

  let orderBy: any = { createdAt: 'desc' };
  let where: any = {};

  if (sort === 'name') {
    orderBy = { name: 'asc' };
  } else if (sort === 'dueDate') {
    orderBy = { dueDate: 'asc' };
  }

  if (filter === 'todo') {
    where.status = 'TODO';
  } else if (filter === 'inProgress') {
    where.status = 'IN_PROGRESS';
  } else if (filter === 'done') {
    where.status = 'DONE';
  }

  try {
    const tasks = await prisma.task.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}
