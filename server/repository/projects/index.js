import { prisma } from '../../db/prisma.js';

function toProject(row) {
    if (!row) return null;
    return {
        id: row.id,
        user_id: row.userId,
        name: row.name,
        description: row.description,
        created_at: row.createdAt,
        updated_at: row.updatedAt,
    };
}

export class ProjectsRepository {

    static async findManyByUser(userId, { skip = 0, take = 20 } = {}, client = prisma) {
        const rows = await client.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take,
        });
        return rows.map(toProject);
    }

    static async findById(id, client = prisma) {
        const row = await client.project.findUnique({ where: { id } });
        return toProject(row);
    }

    static async countByUser(userId, client = prisma) {
        return client.project.count({ where: { userId } });
    }

    static async create({ userId, name, description }, client = prisma) {
        const row = await client.project.create({
            data: { userId, name, description: description ?? null },
        });
        return toProject(row);
    }

    static async update(id, { name, description }, client = prisma) {
        const data = {};
        if (name !== undefined) data.name = name;
        if (description !== undefined) data.description = description;
        const row = await client.project.update({ where: { id }, data });
        return toProject(row);
    }

    static async delete(id, client = prisma) {
        await client.project.delete({ where: { id } });
    }
}
