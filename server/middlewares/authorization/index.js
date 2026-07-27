import { ProjectMembersRepository } from '../../repository/projectMembers/index.js';
import logger from '../../loggers/logger.js';

// Roles are hierarchical: a higher rank implies every lower permission.
// One ordered map drives every access check, so we never need separate
// "canView" / "canEdit" methods — just a different minRole threshold.
export const ProjectRole = {
    VIEWER: 1,
    EDITOR: 2,
    OWNER: 3,
};

export class Authorization {

    // Factory: returns middleware that allows the request only if the caller's
    // role on req.params.projectId is at least minRole. Runs after
    // Authentication.authenticate (which sets req.user) and validateUuidParam.
    static requireProjectRole(minRole) {
        return async (req, res, next) => {
            try {
                const role = await ProjectMembersRepository.findRole({
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
}
