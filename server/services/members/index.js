import { ProjectMembersRepository } from '../../repository/projectMembers/index.js';
import { AuthRepository } from '../../repository/auth/index.js';
import { AppError } from '../../errors/AppError.js';

export class MembersService {

    static async list({ projectId }) {
        return ProjectMembersRepository.findMembers(projectId);
    }

    // Invite a user (by email) or change an existing member's role.
    // Only VIEWER/EDITOR are assignable here — OWNER is reserved for the
    // creator (validated upstream), so we also refuse to touch the owner row.
    static async setMember({ projectId, email, role }) {
        const user = await AuthRepository.findByEmail(email);
        if (!user) {
            throw new AppError(404, 'User not found');
        }

        const current = await ProjectMembersRepository.findRole({ projectId, userId: user.id });
        if (current === 'OWNER') {
            throw new AppError(409, 'Cannot change the project owner\'s role');
        }

        await ProjectMembersRepository.upsertRole({ projectId, userId: user.id, role });
        return { user_id: user.id, email: user.email, role };
    }

    static async removeMember({ projectId, targetUserId }) {
        const current = await ProjectMembersRepository.findRole({ projectId, userId: targetUserId });
        if (current === 'OWNER') {
            throw new AppError(409, 'Cannot remove the project owner');
        }

        const removed = await ProjectMembersRepository.delete({ projectId, userId: targetUserId });
        if (removed === 0) {
            throw new AppError(404, 'Member not found');
        }
    }
}
