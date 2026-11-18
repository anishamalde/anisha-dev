import type { BlogPost } from './data';

// One search used by both the Blog page and the WebMCP tools, so what an agent finds
// is exactly what a visitor would find. Every word in the query must appear somewhere
// in the searched fields, in any order ("ai agents" finds "Agents ... ai").

const ALIASES: [RegExp, string][] = [
  [/in[- ]app purchases?/g, 'iap'],
  [/monetiz/g, 'monetis'],
  [/react[- ]native/g, 'reactnative'],
];

const normalise = (text: string) => ALIASES.reduce((t, [from, to]) => t.replace(from, to), text.toLowerCase());

export function matchesQuery(fields: string[], query: string): boolean {
  const words = normalise(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalise(fields.join(' '));
  return words.every((w) => haystack.includes(w));
}

export function searchPosts(posts: BlogPost[], query: string, tag = 'all'): BlogPost[] {
  return posts.filter(
    (p) =>
      (tag === 'all' || p.tags.includes(tag)) &&
      matchesQuery([p.title, p.excerpt, ...p.tags], query),
  );
}
