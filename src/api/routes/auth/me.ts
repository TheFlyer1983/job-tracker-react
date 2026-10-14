import { Hono } from 'hono';
import { authMiddleware } from '../../../middleware/auth';

const meRoute = new Hono().use('/me', authMiddleware).get('/me', async (c) => {
  const user = c.get('user');

  return c.json(user);
});

export default meRoute;
