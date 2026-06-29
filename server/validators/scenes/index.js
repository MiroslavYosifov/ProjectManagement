import { isPlainObject } from '../common/index.js';

const NAME_MAX = 100;

function validateName(name) {
    if (typeof name !== 'string') return 'Name must be a string';
    const trimmed = name.trim();
    if (trimmed.length < 1) return 'Name is required';
    if (trimmed.length > NAME_MAX) return `Name must be max ${NAME_MAX} characters`;
    return null;
}

export class ScenesValidator {

    static create(req, res, next) {
        const { name, data } = req.body ?? {};

        const nameError = validateName(name);
        if (nameError) return res.status(400).json({ message: nameError });

        if (data !== undefined && !isPlainObject(data)) {
            return res.status(400).json({ message: 'Data must be an object' });
        }

        req.body.name = name.trim();
        next();
    }

    static update(req, res, next) {
        const { name, data } = req.body ?? {};

        if (name === undefined && data === undefined) {
            return res.status(400).json({ message: 'At least one of name or data is required' });
        }

        if (name !== undefined) {
            const nameError = validateName(name);
            if (nameError) return res.status(400).json({ message: nameError });
            req.body.name = name.trim();
        }

        if (data !== undefined && !isPlainObject(data)) {
            return res.status(400).json({ message: 'Data must be an object' });
        }

        next();
    }
}
