# WebMCP friction log

Notes from making anisha.dev WebMCP compatible, kept as raw material for the article.

## What was built

- `src/webmcp.ts` registers four tools: `search-blog-posts`, `list-talks`, `list-projects` (read only) and `navigate-to-page` (changes the visible page only).
- `src/App.tsx` calls `registerWebMcpTools(navigate)` in an effect and aborts the signal on cleanup.
- Tools read the same `data.ts` the pages render from, so there is no second copy of the content.
- No tool writes anything. The contact form (a `mailto:` link) is deliberately not exposed.

## Friction

1. **API name drift.** I started from memory with `navigator.modelContext`. The current draft README uses `document.modelContext`. Early previews may differ again. Mitigation: check both, prefer `document`.
2. **Declarative API is not specced.** The README says the form-based declarative API is being explored separately, with no attributes to use yet. Only the imperative API is buildable today.
3. **Return shape is loosely defined.** The only documented example returns `{ content: [{ type: 'text', text }] }`, with other examples returning plain values. I used the documented shape and JSON-stringified results.
4. **Unregistering is via `AbortSignal`**, not an `unregisterTool` call. This fits React effect cleanup nicely, but it is not what older write-ups describe.
5. **`registerTool` may be a promise.** The README example awaits it, so I wrap it in `Promise.resolve(...).catch` and a try/catch so a failed registration can never break the page.
6. **Tools only exist while the page is open.** `navigate-to-page` is useful because this is a single page app: an agent can move around without a full reload, and tools stay registered because `App` never unmounts.
7. **Tool descriptions are the whole UX.** An agent can only choose from name, description and schema, so these are written like docs (include example values, say what is returned).

## Not done / open questions

- **Not tested in a real WebMCP-enabled browser or agent yet.** It builds and lints, and it is a no-op where `modelContext` is absent. Next step is Chrome with the preview flag plus an agent that can call tools.
- The draft has `exposedTo` options on registration. I haven't used them yet.
- Should the contact form become a tool? Probably only with a confirmation step, since it acts on the user's behalf.
- Worth checking: does the Vercel SPA rewrite matter for agents that fetch pages directly? (`/blog` etc. all return `index.html`.)
