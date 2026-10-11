import type { Request, Response, NextFunction } from 'express';
import { authService } from "../../services/auth/index.js"
import type { AuthResponse, MessageResponse, RegisterResponse } from '@game-editor/shared';

async function register(req: Request, res: Response<RegisterResponse>, next: NextFunction) {
    try {
        const { email, password, username } = req.body;
        const user = await authService.register({ email, password, username});
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

async function login(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const result = await authService.login({ email, password });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function refresh(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
        const { refreshToken } = req.body ?? {};
        const result = await authService.refresh({ refreshToken });
        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}

async function logout(req: Request, res: Response<MessageResponse>, next: NextFunction) {
    try {
        await authService.logout({ sessionId: req.user!.sid });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}

export const authController = { register, login, refresh, logout };
