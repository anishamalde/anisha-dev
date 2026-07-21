import { useMemo, useState } from "react";
import { BLOG_POSTS } from "../data";

export function Blog() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchesTag = activeTag === "all" || p.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [search, activeTag]);

  return (
    <div className="page">
      <h1 className="h1">Blog</h1>
      <div className="blog-search-row">
        <input
          type="text"
          className="text-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
        />
      </div>

      <div className="tag-row tag-row--pills">
        {tags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`pill${activeTag === tag ? " is-active" : ""}`}
          >
            {tag === "all" ? "All" : tag}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid-2">
          {filtered.map((post) => (
            <article key={post.title} className="card card--column">
              <div className="tag-row">
                {post.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="card-title">{post.title}</div>
              <div className="card-excerpt" style={{ flex: 1 }}>
                {post.excerpt}
              </div>
              <div className="card-meta">
                <span>
                  {post.date} · ♥ {post.reactions} · {post.comments} comments
                </span>
                <a href={post.devtoUrl} target="_blank" rel="noreferrer">
                  Read on dev.to ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          No posts match &ldquo;{search}&rdquo; yet.
        </div>
      )}
    </div>
  );
}
