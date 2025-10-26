import express from 'express';
import cors from 'cors';
import path from 'path';
import v1Router from './routes/rest/v1';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';

const app = express();
app.use(express.json());

app.use(cors({ origin: config.corsOrigins }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/rest/v1', v1Router);

app.use(errorHandler);

const port = config.port;

const server = app.listen(Number(port), () => {
  console.log(`PLEARN backend listening on port ${port}`);
});

// Graceful shutdown
function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
  // force exit after timeout
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
