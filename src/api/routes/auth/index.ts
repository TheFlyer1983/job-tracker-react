import { Hono } from 'hono';
import registerRoute from './register';
import meRoute from './me';
import loginRoute from './login';
import logoutRoute from './logout';

const authRoutes = new Hono()
  .route('/', registerRoute)
  .route('/', meRoute)
  .route('/', loginRoute)
  .route('/', logoutRoute);

export default authRoutes;