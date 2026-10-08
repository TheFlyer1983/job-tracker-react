import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../../app';
import { db } from '../../../db';
import { sessionsTable, usersTable, jobsTable } from '../../../db/schema';
import { hashPassword } from '../../../auth/password';
import { eq } from 'drizzle-orm';
import { createSessionId } from '../../../auth/session';

describe('User Me', () => {
  let user: typeof usersTable.$inferSelect;
  let sessionId: string;

  beforeEach(async () => {
    await db.delete(sessionsTable);
    await db.delete(jobsTable);
    await db.delete(usersTable);

    const [createdUser] = await db
      .insert(usersTable)
      .values({
        email: 'test@example.com',
        passwordHash: await hashPassword('password')
      })
      .returning();

    user = createdUser;

    sessionId = createSessionId();

    await db.insert(sessionsTable).values({
      id: sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    });
  });

  it('should return the user', async () => {
    const response = await app.request('/api/auth/me', {
      headers: {
        Cookie: `sessionId=${sessionId}`
      }
    });

    const me = await response.json();
    expect(response.status).toBe(200);
    expect(me.id).toEqual(user.id);
    expect(me.email).toEqual(user.email);
    expect(me.passwordHash).toBeUndefined();
  });

  it('should return 401 if the user is not authenticated', async () => {
    const response = await app.request('/api/auth/me');
    expect(response.status).toBe(401);
  });

  it('should return 401 if the session is invalid', async () => {
    const response = await app.request('/api/auth/me', {
      headers: {
        Cookie: `sessionId=invalid`
      }
    });
    expect(response.status).toBe(401);
  });

  it('should return 401 if the session is expired', async () => {
    await db
      .update(sessionsTable)
      .set({
        expiresAt: new Date(Date.now() - 1000)
      })
      .where(eq(sessionsTable.id, sessionId));

    const response = await app.request('/api/auth/me', {
      headers: {
        Cookie: `sessionId=${sessionId}`
      }
    });
    expect(response.status).toBe(401);
  });
});
