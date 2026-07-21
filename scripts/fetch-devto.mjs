#!/usr/bin/env node
// Fetch published articles from dev.to and write a typed JSON snapshot
// consumed by src/data.ts at build time. Run: `npm run refresh:posts`.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const USERNAME = process.env.DEVTO_USERNAME || 'anishamalde';
const PER_PAGE = 30;

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, '..', 'src', 'blog-posts.json');

const monthShort = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${monthShort[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

async function main() {
  const url = `https://dev.to/api/articles?username=${encodeURIComponent(USERNAME)}&per_page=${PER_PAGE}`;
  const res = await fetch(url, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`dev.to fetch failed: ${res.status} ${res.statusText}`);
  }

  const articles = await res.json();
  if (!Array.isArray(articles)) {
    throw new Error('unexpected dev.to response shape');
  }

  const posts = articles.map((a) => ({
    title: a.title,
    tags: Array.isArray(a.tag_list) ? a.tag_list : [],
    date: formatDate(a.published_timestamp),
    reactions: a.public_reactions_count ?? 0,
    comments: a.comments_count ?? 0,
    excerpt: (a.description ?? '').trim(),
    devtoUrl: a.url,
    coverImage: a.cover_image ?? null,
  }));

  await writeFile(outPath, `${JSON.stringify(posts, null, 2)}\n`);
  console.log(`✓ wrote ${posts.length} posts to ${outPath}`);
}

main().catch((err) => {
  console.error('✗ fetch-devto failed:', err.message);
  process.exit(1);
});
