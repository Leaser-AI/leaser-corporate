import assert from 'node:assert/strict';
import { timingSafeEqual } from 'node:crypto';
import { before, test } from 'node:test';
import worker from '../src/auth.js';

before(() => {
  crypto.subtle.timingSafeEqual = (a, b) => timingSafeEqual(Buffer.from(a), Buffer.from(b));
});

const env = {
  BASIC_AUTH_USERNAME: 'test-user',
  BASIC_AUTH_PASSWORD: 'test-password',
  ASSETS: {
    fetch: async () => new Response('site content', { headers: { 'Content-Type': 'text/html' } }),
  },
};

function request(path, credentials) {
  const headers = credentials === undefined ? {} : { Authorization: credentials };
  return new Request(`https://www.leaserai.com${path}`, { headers });
}

for (const path of ['/', '/system/', '/assets/leaser-og.png', '/_archive/']) {
  test(`requires authentication for ${path}`, async () => {
    const response = await worker.fetch(request(path), env);
    assert.equal(response.status, 401);
    assert.match(response.headers.get('WWW-Authenticate'), /^Basic /);
    assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  });
}

test('rejects invalid and malformed credentials', async () => {
  for (const value of ['Bearer token', 'Basic ?', `Basic ${btoa('test-user:wrong')}`]) {
    assert.equal((await worker.fetch(request('/', value), env)).status, 401);
  }
});

test('allows correct credentials and serves the requested asset', async () => {
  const response = await worker.fetch(request('/system/', `Basic ${btoa('test-user:test-password')}`), env);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'site content');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
});

test('fails closed if a secret is missing', async () => {
  const response = await worker.fetch(request('/', `Basic ${btoa('test-user:test-password')}`), {
    ...env,
    BASIC_AUTH_PASSWORD: undefined,
  });
  assert.equal(response.status, 401);
});
