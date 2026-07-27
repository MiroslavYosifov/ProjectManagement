import logger from './logger.js';
import pinoHttp from 'pino-http';

const pickHeaders = (headers, keys) =>
    keys.reduce((acc, key) => {
        if (headers[key] !== undefined) acc[key] = headers[key];
        return acc;
    }, {});

const httpLogger = pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
        if(res.statusCode >= 500 || err) return 'error';
        if(res.statusCode >= 400) return 'warn';
        return 'info';
    },
    serializers: {
        req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
            headers: pickHeaders(req.headers, ['user-agent', 'referer', 'content-type']),
        }),
    },
});

export default httpLogger;