#!/usr/bin/env node
// Refresh reaction / comment counts on existing posts in src/blog-posts.json
// against the dev.to API. Never adds, removes, or reorders posts — the JSON
// is the source of truth for what appears on the site. New posts on dev.to
// are reported at the end so they can be added manually.
//
// Run: `npm run refresh:posts`.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const USERNAME = process.env.DEVTO_USERNAME || "anishamalde";
const PER_PAGE = 30;

const here = dirname(fileURLToPath(import.meta.url));
const jsonPath = resolve(here, "..", "src", "blog-posts.json");

async function main() {
  const existingRaw = await readFile(jsonPath, "utf8");
  const existing = JSON.parse(existingRaw);
  if (!Array.isArray(existing)) {
    throw new Error(`unexpected shape in ${jsonPath}`);
  }

  const url = `https://dev.to/api/articles?username=${encodeURIComponent(USERNAME)}&per_page=${PER_PAGE}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`dev.to fetch failed: ${res.status} ${res.statusText}`);
  }
  const remote = await res.json();
  if (!Array.isArray(remote)) {
    throw new Error("unexpected dev.to response shape");
  }

  const remoteByUrl = new Map(remote.map((a) => [a.url, a]));
  const matchedUrls = new Set();

  let updatedCount = 0;
  const updated = existing.map((post) => {
    const match = remoteByUrl.get(post.devtoUrl);
    if (!match) return post;
    matchedUrls.add(post.devtoUrl);

    const nextReactions = match.public_reactions_count ?? post.reactions;
    const nextComments = match.comments_count ?? post.comments;
    if (nextReactions === post.reactions && nextComments === post.comments) {
      return post;
    }
    updatedCount += 1;
    return { ...post, reactions: nextReactions, comments: nextComments };
  });

  await writeFile(jsonPath, `${JSON.stringify(updated, null, 2)}\n`);

  console.log(
    `stats refreshed for ${updatedCount} of ${existing.length} posts`,
  );

  const missing = existing.filter((p) => !matchedUrls.has(p.devtoUrl));
  if (missing.length > 0) {
    console.log("");
    console.log(
      `${missing.length} post(s) in JSON not found on dev.to (title changed? unpublished?):`,
    );
    for (const p of missing) console.log(`  - ${p.title} (${p.devtoUrl})`);
  }

  const newOnDevto = remote.filter(
    (a) => !existing.some((p) => p.devtoUrl === a.url),
  );
  if (newOnDevto.length > 0) {
    console.log("");
    console.log(
      `${newOnDevto.length} new post(s) on dev.to not in JSON (add manually if wanted):`,
    );
    for (const a of newOnDevto) console.log(`  - ${a.title}\n    ${a.url}`);
  }
}

main().catch((err) => {
  console.error("refresh:posts failed:", err.message);
  process.exit(1);
});
