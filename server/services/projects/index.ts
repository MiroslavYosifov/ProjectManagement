import { prisma, type Pagination } from '../../db/prisma.js';
import { projectsRepository } from '../../repository/projects/index.js';
import { membersRepository } from '../../repository/members/index.js';
import { createAppError } from '../../errors/index.js';
import type { CreateProjectRequest, UpdateProjectRequest } from '@simulations-project-management/shared';

const MAX_PROJECTS_PER_USER = 20;

async function getAll({ userId, pagination }: { userId: string; pagination?: Pagination }) {
    return membersRepository.findProjectsByMember(userId, pagination);
}

async function getById({ projectId }: { projectId: string }) {
    const project = await projectsRepository.findById(projectId);
    if (!project) {
        throw createAppError(404, 'Project not found');
    }
    return project;
}

async function create({ userId, data }: { userId: string; data: CreateProjectRequest }) {
    const { name, description } = data;
    return prisma.$transaction(async (tx) => {
        const count = await projectsRepository.countByUser(userId, tx);
        if (count >= MAX_PROJECTS_PER_USER) {
            throw createAppError(409, `Project limit reached (max ${MAX_PROJECTS_PER_USER} per user)`);
        }
        const project = await projectsRepository.create({ userId, name, description }, tx);
        await membersRepository.create({ projectId: project.id, userId, role: 'OWNER' }, tx);
        return project;
    }, { isolationLevel: 'Serializable' });
}

async function update({ projectId, data }: { projectId: string; data: UpdateProjectRequest }) {
    return projectsRepository.update(projectId, data);
}

async function deleteProject({ projectId }: { projectId: string }) {
    return projectsRepository.delete(projectId);
}

export const projectsService = { getAll, getById, create, update, delete: deleteProject };
