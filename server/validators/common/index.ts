import type { Request, Response, NextFunction } from 'express';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function validateUuidParam(...names: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const name of names) {
            const value = req.params[name];
            if (typeof value !== 'string' || !UUID_REGEX.test(value)) {
                return res.status(400).json({ message: `${name} must be a valid UUID` });
            }
        }
        next();
    };
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
