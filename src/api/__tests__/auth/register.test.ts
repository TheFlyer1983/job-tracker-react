import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../../app';
import { db } from '../../../db';
import { sessionsTable, usersTable, jobsTable } from '../../../db/schema';
import { hashPassword } from '../../../auth/password';
import { eq } from 'drizzle-orm';

describe('User Registration', () => {
  beforeEach(async () => {
    await db.delete(sessionsTable);
    await db.delete(jobsTable);
    await db.delete(usersTable);
  });

  it('should register a new user', async () => {
    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    expect(response.status).toBe(201);

    const user = await response.json();

    expect(user).toMatchObject({
      email: 'test@example.com'
    });

    expect(user.id).toBeDefined();
    expect(user.passwordHash).toBeUndefined();
  });

  it('should store a hashed password', async () => {
    await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, 'test@example.com'));

    expect(users).toHaveLength(1);
    expect(users[0].passwordHash).toBeDefined();
    expect(users[0].passwordHash).not.toBe('password');
  });

  it('should create a session for the new user', async () => {
    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, 'test@example.com'));

    const sessions = await db.select().from(sessionsTable);

    expect(sessions).toHaveLength(1);
    expect(sessions[0].userId).toBe(users[0].id);

    expect(response.headers.get('Set-Cookie')).toContain('sessionId=');
  });

  it('should not register a user with an existing email', async () => {
    await db.insert(usersTable).values({
      email: 'test@example.com',
      passwordHash: await hashPassword('password')
    });

    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password'
      })
    });

    expect(response.status).toBe(409);

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, 'test@example.com'));

    expect(users).toHaveLength(1);
  });

  it('should reject a password shorter than 8 characters', async () => {
    const response = await app.request('/api/auth/register', {
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

    const error = await response.json();

    expect(error).toMatchObject({
      error: 'Invalid registration details'
    });

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, 'test@example.com'));

    expect(users).toHaveLength(0);
  });

  it('should reject an invalid email address', async () => {
    const response = await app.request('/api/auth/register', {
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

    const error = await response.json();

    expect(error).toMatchObject({
      error: 'Invalid registration details'
    });

    const users = await db.select().from(usersTable);

    expect(users).toHaveLength(0);
  });

  it('should reject a missing email', async () => {
    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: 'password'
      })
    });

    expect(response.status).toBe(400);
  });

  it('should reject a missing password', async () => {
    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });

    expect(response.status).toBe(400);
  });

  it('should reject an empty request body', async () => {
    const response = await app.request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    expect(response.status).toBe(400);
  });
});
