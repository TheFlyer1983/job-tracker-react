import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../../app';
import { db } from '../../../db';
import { sessionsTable, usersTable, jobsTable } from '../../../db/schema';
import { hashPassword } from '../../../auth/password';

describe('User Login', () => {
  let user: typeof usersTable.$inferSelect;

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
  });

  it('should login with valid credentials', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    expect(response.status).toBe(200);

    const loggedInUser = await response.json();

    expect(loggedInUser.email).toBe(user.email);
    expect(loggedInUser.id).toBeDefined();
    expect(loggedInUser.passwordHash).toBeUndefined();
  });

  it('should reject an incorrect password', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrong-password'
      })
    });

    expect(response.status).toBe(401);
  });

  it('should create a session for the logged-in user', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    const sessions = await db.select().from(sessionsTable);

    expect(sessions).toHaveLength(1);
    expect(sessions[0].userId).toBe(user.id);

    expect(response.headers.get('Set-Cookie')).toContain('sessionId=');
  });

  it('should reject an unknown email', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'unknown@example.com',
        password: 'password'
      })
    });

    expect(response.status).toBe(401);
  });

  it('should reject an invalid email', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'not-an-email',
        password: 'password'
      })
    });

    expect(response.status).toBe(400);
  });

  it('should reject a password shorter than 8 characters', async () => {
    const response = await app.request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'short'
      })
    });

    expect(response.status).toBe(400);
  });
});
