import { cp, mkdir, rm } from 'node:fs/promises';

const files = [
  '_archive', 'about', 'assets', 'careers', 'contact', 'for', 'how-leaser-runs',
  'learn', 'outcomes', 'privacy', 'research', 'security', 'system', 'terms',
  'favicon.svg', 'home.css', 'index.html', 'outcomes.css', 'pages.css', 'research.css',
  'pricing.js', 'robots.txt', 'script.js', 'signup.css', 'site.webmanifest',
  'sitemap.xml', 'styles.css',
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of files) {
  await cp(file, `dist/${file}`, { recursive: true });
}
