
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, description, dueDate, status } = await req.json();
    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: new Date(dueDate),
        status: status || 'To Do',
      } as { 
        name: string,
        description: string,
        dueDate: Date,
        status: string 
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

