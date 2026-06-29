import jwt from 'jsonwebtoken';

export class Authentication {
    
    static authenticate(req, res, next) {
        
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
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: payload.sub,
                email: payload.email,
                sid: payload.sid,
            }
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token is expired' });
            }
            return res.status(401).json({ message: 'Token is invalid' });
        }
    }
}