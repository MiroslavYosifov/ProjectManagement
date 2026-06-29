import jwt from 'jsonwebtoken';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthValidator {

    static register(req, res, next) {
        const { email, password, username } = req.body ?? {};

        if(!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Email is required!" })
        }

        const normalizedEmail = email.trim().toLowerCase();
        if(!EMAIL_REGEX.test(normalizedEmail)) {
            return res.status(400).json({ message: 'Email is invalid'});
        }

        if(!password || typeof password !== 'string') {
            return res.status(400).json({ message: "Password is required!" })
        }

        if(password.length < 8) {
            return res.status(400).json({ message: 'Password must be min 8 characters' });
        }

        if(password.length > 128) {
            return res.status(400).json({ message: 'Password must be max 128 characters' });
        }

        if (username !== undefined && username !== null) {
            if (typeof username !== 'string') {
                return res.status(400).json({ message: 'Username must be a string' });
            }
            if (username.length < 3) {
                return res.status(400).json({ message: 'Username must be min 3 characters' });
            }
            if (username.length > 20) {
                return res.status(400).json({ message: 'Username must be max 20 characters' });
            }
        }

        req.body.email = normalizedEmail;
        req.body.username = username?.trim() || null;

        next();
    }

    static login(req, res, next) {
        const { email, password } = req.body ?? {};

        if(!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Email is required!" })
        }

        const normalizedEmail = email.trim().toLowerCase();
        if(!EMAIL_REGEX.test(normalizedEmail)) {
            return res.status(400).json({ message: 'Email is invalid'});
        }

        if(!password || typeof password !== 'string') {
            return res.status(400).json({ message: "Password is required!" })
        }

        req.body.email = normalizedEmail;

        next();
    }
}