import { describe, expect, it } from 'vitest';
import { createSessionId } from './session';

describe('session utilities', () => {
  it('creates a unique session ID', () => {
    const sessionId = createSessionId();

    expect(sessionId).toHaveLength(64);
  });

  it('creates different session IDs', () => {
    const first = createSessionId();
    const second = createSessionId();

    expect(first).not.toBe(second);
  });
});
