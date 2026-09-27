import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

// Adapter is how the client to connect with Postgres
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Prisma client is ORM, who we use in the code for DB operations
export const prisma = new PrismaClient({ adapter });

//   DB Operations:
//   1. "prisma:migrate": "prisma migrate dev"
//   - use on schema.prisma change (new model/field) - apply the change in the database
//   2. "prisma:generate": "prisma generate"
//   - use when we want to update prisma client, do not update the database
//   3. "prisma:studio": "prisma studio"
//   - use when we want examine visually the database
