import { BLOG_POSTS, NAV, PROJECTS, TALKS, type PageKey } from './data';

// WebMCP (https://github.com/webmachinelearning/webmcp) lets a page expose tools
// to in-browser agents. The API is still a draft, so everything here is feature
// detected and the site behaves exactly the same where it is missing.

type ToolResult = { content: { type: 'text'; text: string }[] };

type ToolDescriptor = {
  name: string;
  description: string;
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

const includes = (haystack: string, needle: string) =>
  haystack.toLowerCase().includes(needle.toLowerCase());

export function registerWebMcpTools(navigate: (page: PageKey) => void): () => void {
  const modelContext = getModelContext();
  if (!modelContext) return () => {};

  const controller = new AbortController();
  const options = { signal: controller.signal };
  const pages = NAV.map((n) => n.key);

  const tools: ToolDescriptor[] = [
    {
      name: 'search-blog-posts',
      description:
        "Search Anisha Malde's blog posts (published on dev.to) by keyword in the title, excerpt or tags. Omit the query to list the latest posts.",
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to match, e.g. "react native"' },
          limit: { type: 'number', description: 'Maximum results (default 10)' },
        },
      },
      execute: ({ query, limit }) => {
        const q = typeof query === 'string' ? query : '';
        const max = typeof limit === 'number' && limit > 0 ? limit : 10;
        const results = BLOG_POSTS.filter(
          (p) => !q || includes(p.title, q) || includes(p.excerpt, q) || p.tags.some((t) => includes(t, q)),
        )
          .slice(0, max)
          .map(({ title, date, tags, excerpt, devtoUrl }) => ({ title, date, tags, excerpt, url: devtoUrl }));
        return json(results);
      },
    },
    {
      name: 'list-talks',
      description:
        "List Anisha Malde's talks, workshops and podcasts with venue, year, and slides or video links. Optionally filter by keyword or year.",
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to match in title, venue or blurb' },
          year: { type: 'string', description: 'Four digit year, e.g. "2026"' },
        },
      },
      execute: ({ query, year }) => {
        const q = typeof query === 'string' ? query : '';
        const results = TALKS.filter(
          (t) =>
            (!q || includes(t.title, q) || includes(t.venue, q) || includes(t.blurb, q)) &&
            (typeof year !== 'string' || t.year === year),
        ).map(({ title, venue, year, kind, blurb, slidesUrl, videoUrl }) => ({
          title, venue, year, kind: kind ?? 'talk', blurb, slidesUrl, videoUrl,
        }));
        return json(results);
      },
    },
    {
      name: 'list-projects',
      description:
        "List Anisha Malde's open source projects and samples (React Native, Vega, Fire TV) with GitHub links. Optionally filter by keyword.",
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string', description: 'Keyword to match in name, summary or stack' } },
      },
      execute: ({ query }) => {
        const q = typeof query === 'string' ? query : '';
        const results = PROJECTS.filter(
          (p) => !q || includes(p.name, q) || includes(p.oneLiner, q) || p.stack.some((s) => includes(s, q)),
        ).map(({ name, oneLiner, stack, githubUrl, role }) => ({ name, oneLiner, stack, githubUrl, role }));
        return json(results);
      },
    },
    {
      name: 'navigate-to-page',
      description: 'Show a page of the site to the user. Changes only what is on screen.',
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
      // Some implementations return a promise, so swallow rejections rather than break the page
      Promise.resolve(modelContext.registerTool(tool, options)).catch((err) =>
        console.warn(`[webmcp] could not register ${tool.name}`, err),
      );
    } catch (err) {
      console.warn(`[webmcp] could not register ${tool.name}`, err);
    }
  }

  return () => controller.abort();
}
