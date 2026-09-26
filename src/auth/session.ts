import { randomBytes } from 'node:crypto';

export const createSessionId = () => {
  return randomBytes(32).toString('hex');
};