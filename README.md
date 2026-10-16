# Leaser corporate website

The corporate website for Leaser AI, published at
`https://www.leaserai.com/`.

## Local preview

```bash
python3 -m http.server 45682
```

Then open `http://127.0.0.1:45682/`.

The site is currently static and deployed from `main` on GitHub Pages. The previous site is preserved at `/_archive/`, including its homepage and original navigation. Archived pages are excluded from the current sitemap and marked `noindex, nofollow`.

See [SITEMAP.md](SITEMAP.md) for the current navigation.

## HTTP password gate

The `src/auth.js` Worker protects every page and asset with HTTP Basic Authentication. `scripts/build.mjs` copies only public site files to `dist/`; Wrangler deploys that directory as Workers Static Assets. The username and password are Worker secrets and must never be committed.

To test locally, install dependencies with `npm ci`, create an ignored `.dev.vars` file containing `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD`, then run `npm run dev`. Run `npm test` for the auth checks. An unauthenticated request should return `401` with a `WWW-Authenticate: Basic` header; a request with both correct credentials should return the requested asset.

### Production cutover

1. Add `leaserai.com` to the Cloudflare account and copy the existing DNS records, including mail records. The domain currently uses GoDaddy nameservers and points to GitHub Pages.
2. Set the two Worker secrets in that account: `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD`. Use `npx wrangler secret put <NAME>` or the Cloudflare dashboard. Do not put their values in `wrangler.jsonc`, scripts, or shell command arguments.
3. Run `npm ci`, `npm run build`, and `npx wrangler deploy`. Verify the resulting `workers.dev` URL returns `401` without credentials and `200` on representative routes with credentials.
4. Point the domain's nameservers to Cloudflare and attach `www.leaserai.com` and `leaserai.com` as Worker Custom Domains. Verify both hostnames challenge visitors before serving pages and assets. Update `wrangler.jsonc` with these routes once the zone is active so future deployments retain them.
5. In the repository's GitHub **Settings → Pages**, change the publishing source to **None** after the Worker is serving the live domain. The current `leaser-ai.github.io` origin bypasses any gate placed only on the custom domain, and simply unpublishing the site can be undone by a later push. GitHub Pages cannot itself enforce HTTP Basic Authentication.

If the repository remains public, its site source remains readable on GitHub even after Pages is disabled. The gate controls HTTP access to the hosted site; it does not make repository contents private.
