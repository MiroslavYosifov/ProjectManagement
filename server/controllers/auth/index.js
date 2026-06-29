import { AuthService } from "../../services/auth/index.js"

export class AuthController {

    static async register (req, res, next) {
        try {
            const { email, password, username } = req.body;
            const user = await AuthService.register({ email, password, username});
            res.status(201).json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async login (req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body ?? {};
            const result = await AuthService.refresh({ refreshToken });
            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            await AuthService.logout({ sessionId: req.user.sid });
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            next(err);
        }
    }
}