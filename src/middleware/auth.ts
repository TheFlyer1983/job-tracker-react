import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { db } from '../db';
import { sessionsTable, usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

type AuthEnv = {
  Variables: {
    user: {
      id: string;
      email: string;
    }
  }
}

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const sessionId = getCookie(c, 'sessionId');

  if (!sessionId) {
    console.log('Logged out - no session id');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))
    .limit(1);

  if (!session) {
    console.log('Logged out - session');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  console.log('logged in');

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
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('user', user);

  await next();
});
