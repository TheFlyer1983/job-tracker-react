import { Hono } from 'hono';
import { getCookie, deleteCookie } from 'hono/cookie';
import { db } from '../../../db';
import { sessionsTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const logoutRoute = new Hono().post('/logout', async (c) => {
  console.log('Logging out');
  const sessionId = getCookie(c, 'sessionId');

  if (sessionId) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  }

  deleteCookie(c, 'sessionId', {
    path: '/'
  });

  return c.json('Logged out');
});

export default logoutRoute;
