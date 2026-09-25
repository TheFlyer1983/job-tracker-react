import { Hono } from 'hono';
import jobsRoutes from './routes/jobs';
import authRoutes from './routes/auth';

const app = new Hono();

app.use('*', async (c, next) => {
  console.log('Request received:', c.req.method, c.req.url);
  await next();
});

const routes = app.route('/api/jobs', jobsRoutes).route('/api/auth', authRoutes);

export type AppType = typeof routes;
export { app };

console.log('Server is running on http://localhost:3000');
