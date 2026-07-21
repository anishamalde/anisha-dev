# anisha.dev

Personal site — Vite + React + TypeScript + Framer Motion.

## Local dev

```bash
npm install
npm run dev
```

## Refresh blog posts from dev.to

```bash
npm run refresh:posts
```

This regenerates `src/blog-posts.json` from the dev.to public API. Runs automatically before every `npm run build` via the `prebuild` hook, so production deploys always have fresh posts.

## Deploy

Hosted on Vercel — push to `main` and it deploys automatically. Preview deploys land on every PR.
