// This code ensures that we only have one instance of the Prisma Client in our application,
//  by using the global object to create a global variable prisma.
// The prisma variable is either set to the existing global.prisma instance, or it creates a new instance if it doesn’t exist yet.
// By doing this, we can reuse the same prisma instance across our entire application.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // uncomment to log all queries
    // log: ["query"],
  });

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
