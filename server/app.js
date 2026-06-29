import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';

// Builds and returns the Express app WITHOUT starting a server. Importing this
// module has no side effects (no open port), so tests can mount it on an
// ephemeral port via supertest. The actual listen() lives in server.js.
const app = express();

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
    // Prisma "record not found" on update/delete -> treat as 404.
    if (err.code === 'P2025') {
        return res.status(404).json({ message: 'Resource not found' });
    }

    const status = err.status || 500;
    if(status >= 500) {
        console.error(err)
    }
    res.status(status).json({ message: err.message });
});

export default app;
