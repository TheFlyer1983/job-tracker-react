import { db } from '../../../db';
import { usersTable, sessionsTable } from '../../../db/schema';
import { hashPassword } from '../../../auth/password';
import { createSessionId } from '../../../auth/session';

export async function createAuthenticatedUser() {
  const passwordHash = await hashPassword('password123');

  const [user] = await db
    .insert(usersTable)
    .values({
      email: `test-${crypto.randomUUID()}@example.com`,
      passwordHash
    })
    .returning();

  const sessionId = createSessionId();

  await db.insert(sessionsTable).values({
    id: sessionId,
    userId: user.id,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
  });

  return {
    user,
    sessionId
  };
}