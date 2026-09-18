import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi, afterAll } from 'vitest';
import { server } from '../mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => server.close());
