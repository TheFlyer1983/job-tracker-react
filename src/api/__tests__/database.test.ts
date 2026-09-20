import { describe, it, expect } from 'vitest';
import { db } from '../../db';

describe('database connection', () => {
  it('should connect to the database', async () => {
    const result = await db.execute('SELECT current_database()');

    expect(result.rows[0].current_database).toBe('job_tracker_test');
  });
});
