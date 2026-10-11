import type { IncomingHttpHeaders } from 'node:http';
import logger from './logger.js';
import { pinoHttp, type ReqId } from 'pino-http';

type SerializedRequest = {
    id: ReqId;
    method: string;
    url: string;
    headers: IncomingHttpHeaders;
};

const pickHeaders = (headers: IncomingHttpHeaders, keys: string[]) => {
    return keys.reduce<IncomingHttpHeaders>((acc, key) => {
        if (headers[key] !== undefined) acc[key] = headers[key];
        return acc;
    }, {});
}

const httpLogger = pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
        if(res.statusCode >= 500 || err) return 'error';
        if(res.statusCode >= 400) return 'warn';
        return 'info';
    },
    serializers: {
        req: (req: SerializedRequest) => ({
            id: req.id,
            method: req.method,
            url: req.url,
            headers: pickHeaders(req.headers, ['user-agent', 'referer', 'content-type']),
        }),
    },
});

export default httpLogger;
