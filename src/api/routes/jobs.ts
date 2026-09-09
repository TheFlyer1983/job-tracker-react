import { Hono } from 'hono';
import { db } from '../../db';
import { jobsTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { Job } from '../../db/schema';
import { validator } from 'hono/validator';

const jobsRoutes = new Hono().get('/', async (c) => {
    const result = await db.select().from(jobsTable);

    return c.json(result, 200);
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();

    const result = await db.select().from(jobsTable).where(eq(jobsTable.id, id));

    return c.json(result[0], 200);
  })
  .post('/', async (c) => {
    const body = await c.req.json();

    const result = await db.insert(jobsTable).values(body).returning();

    return c.json(result[0], 201);
  })
  .put('/:id', validator('json', (value) => value as Job), async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json<Job>();

    const result = await db.update(jobsTable).set(body).where(eq(jobsTable.id, id)).returning();

    return c.json(result[0], 200);
  })
  .delete('/:id', async (c) => {
    const { id } = c.req.param();

    await db.delete(jobsTable).where(eq(jobsTable.id, id));

    return c.body(null, 204);
  });

export default jobsRoutes;