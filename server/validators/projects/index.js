const NAME_MAX = 100;
const DESCRIPTION_MAX = 1000;

function validateName(name) {
    if (typeof name !== 'string') return 'Name must be a string';
    const trimmed = name.trim();
    if (trimmed.length < 1) return 'Name is required';
    if (trimmed.length > NAME_MAX) return `Name must be max ${NAME_MAX} characters`;
    return null;
}

function validateDescription(description) {
    if (typeof description !== 'string') return 'Description must be a string';
    if (description.length > DESCRIPTION_MAX) return `Description must be max ${DESCRIPTION_MAX} characters`;
    return null;
}

export class ProjectsValidator {

    static create(req, res, next) {
        const { name, description } = req.body ?? {};

        const nameError = validateName(name);
        if (nameError) return res.status(400).json({ message: nameError });

        if (description !== undefined && description !== null) {
            const descError = validateDescription(description);
            if (descError) return res.status(400).json({ message: descError });
        }

        req.body.name = name.trim();
        next();
    }

    static update(req, res, next) {
        const { name, description } = req.body ?? {};

        if (name === undefined && description === undefined) {
            return res.status(400).json({ message: 'At least one of name or description is required' });
        }

        if (name !== undefined) {
            const nameError = validateName(name);
            if (nameError) return res.status(400).json({ message: nameError });
            req.body.name = name.trim();
        }

        if (description !== undefined && description !== null) {
            const descError = validateDescription(description);
            if (descError) return res.status(400).json({ message: descError });
        }

        next();
    }
}
