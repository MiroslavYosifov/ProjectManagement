import { membersRepository } from '../../repository/members/index.js';
import { authRepository } from '../../repository/auth/index.js';
import { createAppError } from '../../errors/index.js';
import logger from '../../loggers/logger.js';

async function list({ projectId }) {
    return membersRepository.findMembers(projectId);
}

// Invite a user (by email) or change an existing member's role.
// Only VIEWER/EDITOR are assignable
// Only the creator can be OWNER 
async function setMember({ projectId, email, role }) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw createAppError(404, 'User not found');
    }

    const current = await membersRepository.findRole({ projectId, userId: user.id });
    if (current === 'OWNER') {
        throw createAppError(409, 'Cannot change the project owner\'s role');
    }

    await membersRepository.upsertRole({ projectId, userId: user.id, role });
    logger.info({ projectId, userId: user.id, role }, 'Member role set');
    return { user_id: user.id, email: user.email, role };
}

async function removeMember({ projectId, targetUserId }) {
    const current = await membersRepository.findRole({ projectId, userId: targetUserId });
    if (current === 'OWNER') {
        throw createAppError(409, 'Cannot remove the project owner');
    }

    const removed = await membersRepository.delete({ projectId, userId: targetUserId });
    if (removed === 0) {
        throw createAppError(404, 'Member not found');
    }
    logger.info({ projectId, targetUserId }, 'Member removed');
}

export const membersService = { list, setMember, removeMember };