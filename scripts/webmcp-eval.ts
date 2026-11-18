// Offline checks for the WebMCP tools. Expectations come from the site's own data, not from
// hard-coded titles, so adding or renaming posts doesn't break them. No browser or model needed.
// Run with: npm run eval:webmcp
import { registerWebMcpTools } from '../src/webmcp';
import { BLOG_POSTS, TALKS, VEGA_SAMPLES } from '../src/data';

type Tool = { execute: (input: Record<string, unknown>) => Promise<{ content: { text: string }[] }> | { content: { text: string }[] } };
const tools = new Map<string, Tool>();

// Stand in for the browser: collect whatever the site registers
(globalThis as unknown as { document: unknown }).document = {
  modelContext: { registerTool: (t: Tool & { name: string }) => void tools.set(t.name, t) },
};
registerWebMcpTools(() => {});

const run = async (name: string, input: Record<string, unknown> = {}) =>
  JSON.parse((await tools.get(name)!.execute(input)).content[0].text);
const search = (input: Record<string, unknown>): Promise<{ title: string; url: string }[]> =>
  run('search-blog-posts', { limit: 1000, ...input });

const checks: [string, () => Promise<boolean>][] = [
  ['every tag finds every post that has it', async () => {
    for (const tag of new Set(BLOG_POSTS.flatMap((p) => p.tags))) {
      const found = new Set((await search({ query: tag })).map((r) => r.title));
      if (BLOG_POSTS.filter((p) => p.tags.includes(tag)).some((p) => !found.has(p.title))) return false;
    }
    return true;
  }],
  ['every post is found by its own title', async () => {
    for (const p of BLOG_POSTS) {
      if (!(await search({ query: p.title })).some((r) => r.title === p.title)) return false;
    }
    return true;
  }],
  ['word order does not matter', async () => {
    for (const p of BLOG_POSTS) {
      const reversed = p.title.split(/\s+/).reverse().join(' ');
      if (!(await search({ query: reversed })).some((r) => r.title === p.title)) return false;
    }
    return true;
  }],
  ['every result contains every word of the query', async () => {
    const results = await search({ query: 'react tv' });
    return results.length > 0 && results.every((r) => {
      const post = BLOG_POSTS.find((p) => p.title === r.title)!;
      const text = [post.title, post.excerpt, ...post.tags].join(' ').toLowerCase();
      return text.includes('react') && text.includes('tv');
    });
  }],
  ['nonsense returns an empty list', async () => (await search({ query: 'zzqxjv' })).length === 0],
  ['no query lists posts in site order, capped by limit', async () => {
    const results = await run('search-blog-posts', { limit: 3 });
    return results.length === 3 && results.every((r: { title: string }, i: number) => r.title === BLOG_POSTS[i].title);
  }],
  ['"in-app purchases" and "iap" agree', async () => {
    const a = (await search({ query: 'in-app purchases' })).map((r) => r.title).sort();
    const b = (await search({ query: 'iap' })).map((r) => r.title).sort();
    return a.length > 0 && JSON.stringify(a) === JSON.stringify(b);
  }],
  ['"monetize" and "monetise" agree', async () => {
    const a = (await search({ query: 'monetize' })).map((r) => r.title).sort();
    const b = (await search({ query: 'monetise' })).map((r) => r.title).sort();
    return a.length > 0 && JSON.stringify(a) === JSON.stringify(b);
  }],
  ['year filter only returns that year', async () => {
    const year = TALKS[0].year;
    const { past } = await run('list-talks', { year });
    return past.length > 0 && past.every((t: { year: string }) => t.year === year);
  }],
  ['upcoming talks are listed, or explicitly none', async () => {
    const out = await run('list-talks');
    return Array.isArray(out.upcoming) && (out.upcoming.length > 0 || !!out.upcomingNote);
  }],
  ['every Vega sample is reachable through list-projects', async () => {
    const names = new Set((await run('list-projects', { query: 'vega' })).map((p: { name: string }) => p.name));
    return VEGA_SAMPLES.every((s) => names.has(s.name));
  }],
];

let passed = 0;
for (const [name, check] of checks) {
  const ok = await check();
  if (ok) passed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
console.log(`\n${passed}/${checks.length} passed`);
process.exitCode = passed === checks.length ? 0 : 1;
