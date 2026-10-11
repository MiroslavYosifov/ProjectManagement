import type { Request, Response, NextFunction } from 'express';
import { membersService } from '../../services/members/index.js';
import type { MemberListResponse, SetMemberResponse } from '@simulations-project-management/shared';

type ProjectParams = { projectId: string };

async function list(req: Request<ProjectParams>, res: Response<MemberListResponse>, next: NextFunction) {
    try {
        const members = await membersService.list({ projectId: req.params.projectId });
        res.status(200).json({ members });
    } catch (error) {
        next(error);
    }
}

async function set(req: Request<ProjectParams>, res: Response<SetMemberResponse>, next: NextFunction) {
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

async function remove(req: Request<ProjectParams & { userId: string }>, res: Response, next: NextFunction) {
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
