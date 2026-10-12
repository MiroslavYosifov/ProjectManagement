import { prisma } from '../../db/prisma.js';

const url = process.env.DATABASE_URL ?? '';
if (!/test/i.test(url)) {
    throw new Error(
        `Refusing to run tests: DATABASE_URL is not a test DB (${url}). ` +
        'Make sure tests run with .env.test loaded.'
    );
}

export async function resetDb() {
    await prisma.$executeRawUnsafe(
        'TRUNCATE "simulation_metrics","simulation_checkpoints","simulation_run_chunks","simulation_runs","project_members","scenes","projects","sessions","users" RESTART IDENTITY CASCADE'
    );
}

export async function disconnectDb() {
    await prisma.$disconnect();
}

export { prisma };
