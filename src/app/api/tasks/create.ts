import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, dueDate } = req.body;
    const task = await prisma.task.create({
      data: { name, description, dueDate: new Date(dueDate) },
    });
    res.status(201).json(task);
  } else {
    res.status(405).end();
  }
}
