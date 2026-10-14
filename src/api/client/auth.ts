import { hc } from 'hono/client';
import type { AppType } from '../app';
import type { Credentials } from '../routes/auth/schemas';

const client = hc<AppType>('/');

export async function getMe() {
  const response = await client.api.auth.me.$get(undefined, {
    init: {
      credentials: 'include'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No authenticated user.');
    }

    throw new Error('Failed to fetch user.');
  }

  return response.json();
}

export async function login({ email, password }: Credentials) {
  const response = await client.api.auth.login.$post({
    json: {
      email,
      password
    },
    init: {
      credentials: 'include'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function logout() {
  const response = await client.api.auth.logout.$post({
    init: {
      credentials: 'include'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to logout');
  }

  return response.json();
}

export async function register({ email, password }: Credentials) {
  const response = await client.api.auth.register.$post({
    json: {
      email,
      password
    },
    init: {
      credentials: 'include'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}
