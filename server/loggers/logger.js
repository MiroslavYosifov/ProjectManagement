import pino from "pino";

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    redact: {
        paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'res.headers["set-cookie"]',
            '*.password',
            '*.password_hash',
            '*.refreshToken',
            '*.accessToken',
        ]
    },
    transport: { target: 'pino-pretty', options: { colorize: true } }
});

export default logger;