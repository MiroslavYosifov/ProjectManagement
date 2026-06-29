import { MembersService } from '../../services/members/index.js';

export class MembersController {

    static async list(req, res, next) {
        try {
            const members = await MembersService.list({ projectId: req.params.projectId });
            res.status(200).json({ members });
        } catch (error) {
            next(error);
        }
    }

    static async set(req, res, next) {
        try {
            const member = await MembersService.setMember({
                projectId: req.params.projectId,
                email: req.body.email,
                role: req.body.role,
            });
            res.status(200).json({ member });
        } catch (error) {
            next(error);
        }
    }

    static async remove(req, res, next) {
        try {
            await MembersService.removeMember({
                projectId: req.params.projectId,
                targetUserId: req.params.userId,
            });
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
