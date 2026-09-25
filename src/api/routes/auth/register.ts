import { Hono } from 'hono';
import { db } from '../../../db';
import { usersTable, sessionsTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../auth/password';
import { createSessionId } from './session';
import { setCookie } from 'hono/cookie';
import { credentialsSchema } from './schemas';


const registerRoute = new Hono().post('/register', async (c) => {
  const body = await c.req.json();

  const result = credentialsSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid registraion details' }, 400);
  }

  const email = result.data.email.toLowerCase();
  const { password } = result.data;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser[0]) {
    return c.json({ error: 'Email already registered' }, 409);
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      passwordHash
    })
    .returning({
      id: usersTable.id,
      email: usersTable.email
    });

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
    maxAge: 60 * 60 * 24 * 7,
  })

  return c.json(user, 201);
});

export default registerRoute;
