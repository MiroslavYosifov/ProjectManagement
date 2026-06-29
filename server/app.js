import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});