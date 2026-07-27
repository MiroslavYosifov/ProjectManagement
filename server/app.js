import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';
import logger from './loggers/logger.js';
import httpLogger from './loggers/httpLogger.js';

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
    if (err.code === 'P2025') {
        logger.warn({ err }, 'Resource not found');
        return res.status(404).json({ message: 'Resource not found' });
    }

    const status = err.status || 500;
    if(status >= 500) {
        logger.error({ err }, 'Something broke');
    } else {
        logger.warn({ err }, 'Request failed');
    }

    res.status(status).json({ message: err.message });
});

export default app;
