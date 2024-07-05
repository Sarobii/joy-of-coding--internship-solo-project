import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: { json: () => PromiseLike<{ name: any; description: any; dueDate: any }> | { name: any; description: any; dueDate: any } }) {
  try {
    const { name, description, dueDate } = await req.json()
    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: new Date(dueDate),
      },
    })
    return new Response(JSON.stringify(task), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Request error', error)
    return new Response(JSON.stringify({ error: 'Error creating task' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}