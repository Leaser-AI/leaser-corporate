# Leaser corporate website

The corporate website for Leaser AI, intended for deployment at
`www.leaserai.com`.

## Local preview

```bash
python3 -m http.server 45682
```

Then open `http://127.0.0.1:45682/`.

## Site roles

- `www.leaserai.com`: corporate narrative, commercial outcomes, and conversion for owner-operators and equity partners
- `build.leaserai.com`: architecture, research, field notes, ecosystem, and careers

The site is static and compatible with GitHub Pages. Add a `CNAME` containing
`www.leaserai.com` only when the production cutover is ready.
