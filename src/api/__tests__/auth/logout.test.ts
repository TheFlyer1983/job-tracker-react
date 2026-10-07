import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../../app';
import { db } from '../../../db';
import { sessionsTable, usersTable, jobsTable } from '../../../db/schema';
import { hashPassword } from '../../../auth/password';
import { createSessionId } from '../../../auth/session';
import { eq } from 'drizzle-orm';

describe('User Logout', () => {
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
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db
      .insert(sessionsTable)
      .values({
        id: sessionId,
        userId: user.id,
        expiresAt
      })
      .returning();
  });

  it('should logout the user', async () => {
    const response = await app.request('/api/auth/logout', {
      method: 'POST',
      headers: {
        Cookie: `sessionId=${sessionId}`
      }
    });

    expect(response.status).toBe(200);

    const sessions = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId));

    expect(sessions).toHaveLength(0);
    expect(response.headers.get('Set-Cookie')).toContain('sessionId=');
    expect(response.headers.get('Set-Cookie')).toContain('Max-Age=0');
  });

  it('should logout without an existing session', async () => {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));

    const response = await app.request('/api/auth/logout', {
      method: 'POST'
    });

    expect(response.status).toBe(200);
  });

  it('should logout with an invalid session', async () => {
    const invalidSessionId = createSessionId();

    const response = await app.request('/api/auth/logout', {
      method: 'POST',
      headers: {
        Cookie: `sessionId=${invalidSessionId}`
      }
    });

    expect(response.status).toBe(200);

    const sessions = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, invalidSessionId));

    expect(sessions).toHaveLength(0);

    expect(response.headers.get('Set-Cookie')).toContain('sessionId=');
    expect(response.headers.get('Set-Cookie')).toContain('Max-Age=0');
  });
});
