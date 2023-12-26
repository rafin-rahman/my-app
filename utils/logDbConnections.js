import { prisma } from "@/lib/prisma";

export async function logDbConnections() {
  try {
    const result =
      await prisma.$queryRaw`SELECT COUNT(*) FROM pg_stat_activity WHERE datname = ${process.env.DATABASE_NAME}`;
    console.log("Active DB Connections:", result[0].count);
  } catch (error) {
    console.error("Error logging DB connections:", error);
  } finally {
    await prisma.$disconnect();
  }
}
