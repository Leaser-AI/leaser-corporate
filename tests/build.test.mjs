import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

const excluded = new Set(['.git', '.codex-build', 'dist', 'node_modules', 'output', 'scripts', 'src', 'tests']);

function htmlFiles(directory, root = true) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      if (root && excluded.has(entry.name)) return [];
      return htmlFiles(path.join(directory, entry.name), false);
    }
    return entry.name.endsWith('.html') ? [path.join(directory, entry.name)] : [];
  });
}

test('built site includes every source HTML page', () => {
  const missing = htmlFiles('.').filter((file) => !existsSync(path.join('dist', file)));
  assert.deepEqual(missing, []);
});

test('built HTML has no missing local links or assets', () => {
  const missing = [];
  for (const file of htmlFiles('dist')) {
    const html = readFileSync(file, 'utf8');
    for (const [, original] of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(original)) continue;
      const local = original.split(/[?#]/)[0];
      if (!local) continue;
      let target = local.startsWith('/')
        ? path.join('dist', local)
        : path.resolve(path.dirname(file), local);
      if (existsSync(target) && statSync(target).isDirectory()) target = path.join(target, 'index.html');
      if (!existsSync(target)) missing.push(`${file}: ${original}`);
    }
  }
  assert.deepEqual(missing, []);
});
