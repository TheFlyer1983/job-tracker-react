import { Hono } from 'hono';
import { db } from '../../db';
import { jobsTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { createJobSchema, updateJobSchema } from '../../validation/jobs';
import { zValidator } from '@hono/zod-validator';

const jobsRoutes = new Hono()
  .get('/', async (c) => {
    const result = await db.select().from(jobsTable);

    return c.json(result, 200);
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();

    const result = await db.select().from(jobsTable).where(eq(jobsTable.id, id));

    if (!result[0]) {
      return c.json({ error: 'Job not found' }, 404);
    }

    return c.json(result[0], 200);
  })
  .post('/', zValidator('json', createJobSchema), async (c) => {
    const body = c.req.valid('json');

    const result = await db.insert(jobsTable).values(body).returning();

    return c.json(result[0], 201);
  })
  .put(
    '/:id',
    zValidator('json', updateJobSchema),
    async (c) => {
      const { id } = c.req.param();
      const body = c.req.valid('json');

      const result = await db.update(jobsTable).set(body).where(eq(jobsTable.id, id)).returning();

      if (!result[0]) {
        return c.json({ error: 'Job not found' }, 404);
      }

      return c.json(result[0], 200);
    }
  )
  .delete('/:id', async (c) => {
    const { id } = c.req.param();

    const result = await db.delete(jobsTable).where(eq(jobsTable.id, id)).returning();

    if (!result[0]) {
      return c.json({ error: 'Job not found' }, 404);
    }

    return c.body(null, 204);
  });

export default jobsRoutes;
