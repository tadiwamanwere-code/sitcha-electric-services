import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import {createServer as createViteServer} from 'vite';
import chatHandler from './api/chat';
import quoteHandler from './api/quote';

dotenv.config();

/**
 * Dev + self-hosted production server.
 *
 * Dev:  tsx server.ts          → Vite middleware, HMR, API routes mounted
 * Prod: node dist/server.cjs   → serves dist/ statically, SPA fallback, API routes
 *
 * The API handlers are imported from api/ rather than duplicated, so the Vercel
 * serverless deployment and this server can never drift apart.
 */
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({limit: '100kb'}));

  app.post('/api/chat', (req, res) => chatHandler(req, res));
  app.post('/api/quote', (req, res) => quoteHandler(req, res));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
