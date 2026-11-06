import type { ValidationTargets } from 'hono';
import type * as z from 'zod';
import { zValidator as zv } from '@hono/zod-validator';

export const zValidator = <T extends z.ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
  message: string = 'Invalid request'
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json({ error: message }, 400);
    }
  });
