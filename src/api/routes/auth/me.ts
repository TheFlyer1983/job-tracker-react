import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { db } from '../../../db';
import { sessionsTable, usersTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const meRoute = new Hono().get('/me', async (c) => {
  const sessionId = getCookie(c, 'sessionId');

  if (!sessionId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))
    .limit(1);

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  if (session.expiresAt < new Date()) {
    return c.json({ error: 'Session expired' }, 401);
  }

  const [user] = await db
  .select({
    id: usersTable.id,
    email: usersTable.email
  })
  .from(usersTable)
  .where(eq(usersTable.id, session.userId))
  .limit(1);

  if (!user) {
  return c.json(
    { error: 'User not found' },
    401
  );
}

  return c.json(user);
});

export default meRoute;
