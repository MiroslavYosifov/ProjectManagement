import 'dotenv/config';
import app from './app.js';
import logger from './loggers/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
