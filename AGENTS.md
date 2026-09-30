# Repository guidance

This repository contains the static corporate website for Leaser AI.

## Deploy Configuration (configured by /setup-deploy)

- Platform: GitHub Pages
- Production URL: https://leaser-ai.github.io/leaser-corporate/
- Deploy workflow: GitHub Pages from `main` at repository root
- Deploy status command: `gh run list --repo Leaser-AI/leaser-corporate --workflow pages-build-deployment --limit 1`
- Merge method: direct push to `main`
- Project type: static web app
- Post-deploy health check: https://leaser-ai.github.io/leaser-corporate/

### Custom deploy hooks

- Pre-merge: validate HTML, sitemap, internal links, and responsive rendering
- Deploy trigger: automatic on push to `main`
- Deploy status: watch the `pages-build-deployment` workflow
- Health check: verify the production URL and representative routes return HTTP 200
