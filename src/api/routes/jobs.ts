import { Hono } from 'hono';
import { db } from '../../db';
import { jobsTable } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { createJobSchema, updateJobSchema, jobIdSchema } from '../../validation/jobs';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '../../middleware/auth';

const jobsRoutes = new Hono()
  .use('*', authMiddleware)
  .get('/', async (c) => {
    const user = c.get('user');
    const result = await db.select().from(jobsTable).where(eq(jobsTable.userId, user.id));

    return c.json(result, 200);
  })
  .get('/:id', zValidator('param', jobIdSchema), async (c) => {
    const { id } = c.req.param();
    const user = c.get('user');

    const result = await db
      .select()
      .from(jobsTable)
      .where(and(eq(jobsTable.id, id), eq(jobsTable.userId, user.id)));

    if (!result[0]) {
      return c.json({ error: 'Job not found' }, 404);
    }

    return c.json(result[0], 200);
  })
  .post('/', zValidator('json', createJobSchema), async (c) => {
    const body = c.req.valid('json');
    const user = c.get('user');

    const result = await db
      .insert(jobsTable)
      .values({ ...body, userId: user.id })
      .returning();

    return c.json(result[0], 201);
  })
  .put('/:id', zValidator('param', jobIdSchema), zValidator('json', updateJobSchema), async (c) => {
    const { id } = c.req.param();
    const user = c.get('user');

    const body = c.req.valid('json');

    const result = await db
      .update(jobsTable)
      .set(body)
      .where(and(eq(jobsTable.id, id), eq(jobsTable.userId, user.id)))
      .returning();

    if (!result[0]) {
      return c.json({ error: 'Job not found' }, 404);
    }

    return c.json(result[0], 200);
  })
  .delete('/:id', zValidator('param', jobIdSchema), async (c) => {
    const { id } = c.req.param();
    const user = c.get('user');

    const result = await db
      .delete(jobsTable)
      .where(and(eq(jobsTable.id, id), eq(jobsTable.userId, user.id)))
      .returning();

    if (!result[0]) {
      return c.json({ error: 'Job not found' }, 404);
    }

    return c.body(null, 204);
  });

export default jobsRoutes;
