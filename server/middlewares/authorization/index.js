import { membersRepository } from '../../repository/members/index.js';
import logger from '../../loggers/logger.js';

export const ProjectRole = {
    VIEWER: 1,
    EDITOR: 2,
    OWNER: 3,
};

function requireProjectRole(minRole) {
    return async (req, res, next) => {
        try {
            const role = await membersRepository.findRole({
                projectId: req.params.projectId,
                userId: req.user.id,
            });

            if (!role) {
                return res.status(404).json({ message: 'Project not found' });
            }

            if (ProjectRole[role] < ProjectRole[minRole]) {
                logger.warn({}, 'Insufficient permissions');
                return res.status(403).json({ message: 'Insufficient permissions' });
            }
            req.projectRole = role;
            next();
        } catch (err) {
            next(err);
        }
    };
}

export const authorization = { requireProjectRole };
