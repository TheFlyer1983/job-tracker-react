import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { expect } from 'vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi, afterAll } from 'vitest';
import { server } from '../mocks/server';

expect.extend(axeMatchers);

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => server.close());
