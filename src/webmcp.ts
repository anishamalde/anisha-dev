import { BLOG_POSTS, NAV, PROJECTS, TALKS, UPCOMING_TALKS, VEGA_SAMPLES, type PageKey } from './data';
import { matchesQuery, searchPosts } from './search';

// WebMCP (https://github.com/webmachinelearning/webmcp) lets a page expose tools
// to in-browser agents. The API is still a draft, so everything here is feature
// detected and the site behaves exactly the same where it is missing.

type ToolResult = { content: { type: 'text'; text: string }[] };

type ToolDescriptor = {
  name: string;
  title?: string;
  description: string;
  annotations?: { readOnlyHint?: boolean };
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<ToolResult> | ToolResult;
};

type ModelContext = {
  registerTool: (tool: ToolDescriptor, options?: { signal?: AbortSignal }) => unknown;
};

function getModelContext(): ModelContext | undefined {
  // Spec draft uses document.modelContext; early Chrome previews used navigator.modelContext
  const doc = document as unknown as { modelContext?: ModelContext };
  const nav = navigator as unknown as { modelContext?: ModelContext };
  return doc.modelContext ?? nav.modelContext;
}

const json = (value: unknown): ToolResult => ({
  content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
});

export function registerWebMcpTools(navigate: (page: PageKey) => void): () => void {
  const modelContext = getModelContext();
  if (!modelContext) return () => {};

  const controller = new AbortController();
  const options = { signal: controller.signal };
  const pages = NAV.map((n) => n.key);

  const tools: ToolDescriptor[] = [
    {
      name: 'search-blog-posts',
      title: 'Search blog posts',
      annotations: { readOnlyHint: true },
      description: 'Search Anisha\'s blog posts by keyword.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords to match. Every word must appear in the title, excerpt or tags, e.g. "react native tv". Omit to list the latest posts.' },
          limit: { type: 'number', description: 'Maximum results (default 10)' },
        },
      },
      execute: ({ query, limit }) => {
        const q = typeof query === 'string' ? query : '';
        const max = typeof limit === 'number' && limit > 0 ? limit : 10;
        const results = searchPosts(BLOG_POSTS, q)
          .slice(0, max)
          .map(({ title, date, tags, excerpt, devtoUrl }) => ({ title, date, tags, excerpt, url: devtoUrl }));
        return json(results);
      },
    },
    {
      name: 'list-talks',
      title: 'List talks',
      annotations: { readOnlyHint: true },
      description: 'List Anisha\'s talks and workshops.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords to match in title, venue or blurb' },
          year: { type: 'string', description: 'Four digit year, e.g. "2026"' },
        },
      },
      execute: ({ query, year }) => {
        const q = typeof query === 'string' ? query : '';
        const past = TALKS.filter(
          (t) =>
            matchesQuery([t.title, t.venue, t.blurb], q) &&
            (typeof year !== 'string' || t.year === year),
        ).map(({ title, venue, year, kind, blurb, slidesUrl, videoUrl }) => ({
          title, venue, year, kind: kind ?? 'talk', blurb, slidesUrl, videoUrl,
        }));
        const upcoming = UPCOMING_TALKS.filter((t) => matchesQuery([t.title, t.venue, t.location], q));
        return json({
          upcoming,
          ...(upcoming.length === 0 && { upcomingNote: 'No upcoming talks are announced right now.' }),
          past,
        });
      },
    },
    {
      name: 'list-projects',
      title: 'List projects',
      annotations: { readOnlyHint: true },
      description: 'List Anisha\'s open source projects and Vega samples.',
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string', description: 'Keyword to match in name, summary or stack' } },
      },
      execute: ({ query }) => {
        const q = typeof query === 'string' ? query : '';
        const projects = PROJECTS.filter((p) => matchesQuery([p.name, p.oneLiner, ...p.stack], q)).map(
          ({ name, oneLiner, stack, githubUrl, role }) => ({ type: 'project', name, oneLiner, stack, githubUrl, role }),
        );
        const samples = VEGA_SAMPLES.filter((v) => matchesQuery([v.name, v.oneLiner, 'vega'], q)).map(
          ({ name, oneLiner, githubUrl }) => ({ type: 'vega-sample', name, oneLiner, githubUrl }),
        );
        return json([...projects, ...samples]);
      },
    },
    {
      name: 'navigate-to-page',
      title: 'Navigate to page',
      annotations: { readOnlyHint: false },
      description: 'Show a page of the site.',
      inputSchema: {
        type: 'object',
        properties: { page: { type: 'string', enum: pages, description: 'Page to show' } },
        required: ['page'],
      },
      execute: ({ page }) => {
        if (typeof page !== 'string' || !pages.includes(page as PageKey)) {
          return json({ error: `Unknown page. Use one of: ${pages.join(', ')}` });
        }
        navigate(page as PageKey);
        return json({ ok: true, page });
      },
    },
  ];

  for (const tool of tools) {
    try {
      // Some implementations return a promise, so swallow rejections rather than break the page.
      // An aborted signal only means the effect was cleaned up (StrictMode does this in dev), so stay quiet.
      Promise.resolve(modelContext.registerTool(tool, options)).catch((err) => {
        if (!controller.signal.aborted) console.warn(`[webmcp] could not register ${tool.name}`, err);
      });
    } catch (err) {
      if (!controller.signal.aborted) console.warn(`[webmcp] could not register ${tool.name}`, err);
    }
  }

  return () => controller.abort();
}
