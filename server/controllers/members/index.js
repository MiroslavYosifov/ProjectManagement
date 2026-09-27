import { membersService } from '../../services/members/index.js';

async function list(req, res, next) {
    try {
        const members = await membersService.list({ projectId: req.params.projectId });
        res.status(200).json({ members });
    } catch (error) {
        next(error);
    }
}

async function set(req, res, next) {
    try {
        const member = await membersService.setMember({
            projectId: req.params.projectId,
            email: req.body.email,
            role: req.body.role,
        });
        res.status(200).json({ member });
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        await membersService.removeMember({
            projectId: req.params.projectId,
            targetUserId: req.params.userId,
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const membersController = { list, set, remove };
