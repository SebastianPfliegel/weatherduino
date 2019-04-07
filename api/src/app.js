import express from 'express';
import apiRoutes from './routes/api';

const app = express();

app.use('/api', apiRoutes);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res
        .status(status)
        .json({
            status,
            message: err.message
        });
});

export default app;
