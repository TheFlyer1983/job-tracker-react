import { credentialsSchema } from './schemas';
import { Hono } from 'hono';
import { db } from '../../../db';
import { usersTable, sessionsTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword } from '../../../auth/password';
import { setCookie } from 'hono/cookie';
import { createSessionId } from './session';

const loginRoute = new Hono().post('/login', async (c) => {
  const body = await c.req.json();

  const result = credentialsSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid login details' }, 400);
  }

  const email = result.data.email.toLowerCase();
  const { password } = result.data;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

  if (!user) {
    return c.json({ error: 'Invalid login details' }, 401);
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash);

  if (!isValidPassword) {
    return c.json({ error: 'Invalid login details' }, 401);
  }

  const sessionId = createSessionId();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await db.insert(sessionsTable).values({
    id: sessionId,
    userId: user.id,
    expiresAt
  });

  setCookie(c, 'sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return c.json({id: user.id, email: user.email}, 200);
});

export default loginRoute;
