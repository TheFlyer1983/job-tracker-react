import { z } from 'zod';
import { Hono } from 'hono';
import { db } from '../../../db';
import { sessionsTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../auth/password';
import { randomBytes } from 'node:crypto';

export const createSessionId = () => {
  return randomBytes(32).toString('hex');
};