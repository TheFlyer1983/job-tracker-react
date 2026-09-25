import { Hono } from 'hono';
import jobsRoutes from './routes/jobs';
import registerRoute from './routes/auth/register';
import meRoute from './routes/auth/me';
import loginRoute from './routes/auth/login';

const app = new Hono();

app.use('*', async (c, next) => {
  console.log('Request received:', c.req.method, c.req.url);
  await next();
});

const routes = app
  .route('/api/jobs', jobsRoutes)
  .route('api/auth', registerRoute)
  .route('api/auth', meRoute)
  .route('api/auth', loginRoute);
export type AppType = typeof routes;
export { app };

console.log('Server is running on http://localhost:3000');
