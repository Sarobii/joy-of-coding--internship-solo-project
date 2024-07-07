import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient
    }
    interface GlobalWithPrisma extends NodeJS.Global {
      prisma?: PrismaClient
    }
  }
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  const globalWithPrisma = global as NodeJS.GlobalWithPrisma

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }

  prisma = globalWithPrisma.prisma
}

export default prisma