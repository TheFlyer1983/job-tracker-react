import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './password';

describe('password utilities', () => {
  it('hashes and verifies a password', async () => {
    const password = 'my-secret-password';

    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const hash = await hashPassword('my-secret-password');

    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });
});