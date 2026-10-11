import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../../loggers/logger.js';

type AccessTokenPayload = { sub: string; email: string; sid: string };

function authenticate(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: 'Authorization hader is required' });
    }

    if(!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization headr must start with Bearer'});
    }

    const token = authHeader.slice(7).trim();
    if(!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] }) as AccessTokenPayload;
        req.user = {
            id: payload.sub,
            email: payload.email,
            sid: payload.sid,
        }
        next();
    } catch (error) {
        if (error instanceof Error && error.name === 'TokenExpiredError') {
            logger.warn({}, 'Token is expired');
            return res.status(401).json({ message: 'Token is expired' });
        }
        logger.warn({}, 'Token is invalid');
        return res.status(401).json({ message: 'Token is invalid' });
    }
}

export const authentication = { authenticate };
