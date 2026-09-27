const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ASSIGNABLE_ROLES = ['VIEWER', 'EDITOR'];

function add(req, res, next) {
    const { email, role } = req.body ?? {};

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return res.status(400).json({ message: 'Email is invalid' });
    }

    if (!role || typeof role !== 'string' || !ASSIGNABLE_ROLES.includes(role)) {
        return res.status(400).json({ message: `Role must be one of: ${ASSIGNABLE_ROLES.join(', ')}` });
    }

    req.body.email = normalizedEmail;
    next();
}

export const membersValidator = { add };
