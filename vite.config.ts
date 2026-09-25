/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = import.meta.dirname;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.BASE_API_URL,
          changeOrigin: true
        }
      }
    },
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['**/node_modules/**']
      },
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook')
            })
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium'
                }
              ],
            }
          }
        },
        {
          test: {
            name: 'unit',
            environment: 'jsdom',
            setupFiles: './src/test/setup.ts',
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
            exclude: ['src/api/__tests__/*.test.ts', '**/node_modules/**']
          }
        },
        {
          test: {
            name: 'api',
            environment: 'node',
            include: ['src/api/__tests__/*.test.ts'],
            setupFiles: './src/test/api.setup.ts'
          }
        }
      ]
    }
  };
});
