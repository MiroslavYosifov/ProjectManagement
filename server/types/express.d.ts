import type { ProjectRole } from '../generated/prisma/client.js';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string; sid: string };
            projectRole?: ProjectRole;
        }
    }
}
