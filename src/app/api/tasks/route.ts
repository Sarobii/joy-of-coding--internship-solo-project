import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(_req: any) {
  try {
    const tasks = await prisma.task.findMany()
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Request error', error)
    return new Response(JSON.stringify({ error: 'Error fetching tasks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}