import { prisma } from '../../db/prisma.js';

// Safety net: refuse to run destructive resets against anything that doesn't
// look like a dedicated test database. A typo in .env.test (or forgetting to
// load it) should fail loudly here instead of wiping a real database.
const url = process.env.DATABASE_URL ?? '';
if (!/test/i.test(url)) {
    throw new Error(
        `Refusing to run tests: DATABASE_URL does not look like a test DB (${url}). ` +
        'Make sure tests run with .env.test loaded.'
    );
}

// Empties every table between tests so each test starts from a known state.
// RESTART IDENTITY resets any serial counters; CASCADE follows FKs so we can
// truncate parents and children in one statement regardless of order.
export async function resetDb() {
    await prisma.$executeRawUnsafe(
        'TRUNCATE "project_members","scenes","projects","sessions","users" RESTART IDENTITY CASCADE'
    );
}

// Closes the pool so the test process can exit cleanly after the suite.
export async function disconnectDb() {
    await prisma.$disconnect();
}

export { prisma };
