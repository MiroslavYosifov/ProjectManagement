const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Returns middleware that rejects malformed route params before they reach
// Prisma (which would otherwise throw a raw error on a non-UUID id).
export function validateUuidParam(...names) {
    return (req, res, next) => {
        for (const name of names) {
            const value = req.params[name];
            if (!value || !UUID_REGEX.test(value)) {
                return res.status(400).json({ message: `${name} must be a valid UUID` });
            }
        }
        next();
    };
}

export function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
