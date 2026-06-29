import { prisma } from '../../db/prisma.js';
import { ProjectsRepository } from '../../repository/projects/index.js';
import { ProjectMembersRepository } from '../../repository/projectMembers/index.js';
import { AppError } from '../../errors/AppError.js';

const MAX_PROJECTS_PER_USER = 20;

export class ProjectsService {

    static async getAll({ userId, pagination }) {
        // Access flows through membership, so this returns owned + shared projects.
        return ProjectMembersRepository.findProjectsByMember(userId, pagination);
    }

    static async getById({ projectId }) {
        const project = await ProjectsRepository.findById(projectId);
        // Access is already verified by requireProjectRole; this only guards the
        // rare case where the project was deleted between that check and now.
        if (!project) {
            throw new AppError(404, 'Project not found');
        }
        return project;
    }

    static async create({ userId, data }) {
        const { name, description } = data;
        return prisma.$transaction(async (tx) => {
            const count = await ProjectsRepository.countByUser(userId, tx);
            if (count >= MAX_PROJECTS_PER_USER) {
                throw new AppError(409, `Project limit reached (max ${MAX_PROJECTS_PER_USER} per user)`);
            }
            const project = await ProjectsRepository.create({ userId, name, description }, tx);
            // The creator becomes OWNER so they immediately have full access.
            await ProjectMembersRepository.create({ projectId: project.id, userId, role: 'OWNER' }, tx);
            return project;
        }, { isolationLevel: 'Serializable' });
    }

    static async update({ projectId, data }) {
        // Access already verified by requireProjectRole('EDITOR'); a single
        // update is atomic on its own, so no transaction is needed.
        return ProjectsRepository.update(projectId, data);
    }

    static async delete({ projectId }) {
        // Cascade (onDelete: Cascade) removes the project's scenes and members.
        return ProjectsRepository.delete(projectId);
    }
}
