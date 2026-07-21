import { motion } from "framer-motion";
import { BLOG_POSTS, GREETINGS, PROJECTS, TALKS, type PageKey } from "../data";
import { useTypewriter } from "../hooks/useTypewriter";
import { GitHubIcon, PinIcon } from "../components/Icons";
import profilePhoto from "../assets/profile.png";

type Props = {
  onNavigate: (p: PageKey) => void;
};

const featuredPosts = BLOG_POSTS.slice(0, 2);
const featuredProjects = PROJECTS.slice(0, 2);
const topTalk = TALKS[0];

export function Home({ onNavigate }: Props) {
  const typed = useTypewriter(GREETINGS);

  return (
    <>
      <section className="hero">
        <div className="hero__blob hero__blob--a" />
        <div className="hero__blob hero__blob--b" />

        <motion.div
          className="hero__col"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero__row">
            <div className="hero__photo">
              <img
                src={profilePhoto}
                alt="Anisha Malde"
                className="hero__photo-img"
              />
            </div>
            <h1 className="hero__title">Hi, I&rsquo;m Anisha.</h1>
          </div>

          <p className="hero__lead">
            <span>
              I help developers build for Amazon&rsquo;s Devices &amp; Appstore
              — from Fire TV to Vega OS.
            </span>
            <span className="hero__loc">
              <PinIcon />
              Based in London
            </span>
          </p>

          <div className="hero__links">
            <a
              href="https://github.com/anishamalde"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/anishamalde/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://dev.to/anishamalde"
              target="_blank"
              rel="noreferrer"
            >
              dev.to ↗
            </a>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="hero__link-cta"
            >
              Contact me →
            </button>
          </div>
        </motion.div>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div className="terminal__bar">
            <span className="terminal__dot" style={{ background: "#ff5468" }} />
            <span className="terminal__dot" style={{ background: "#ff9152" }} />
            <span className="terminal__dot" style={{ background: "#f6d9a0" }} />
          </div>
          <div className="terminal__body">
            <div className="terminal__line">
              <span className="terminal__prompt">$ </span>
              {typed}
              <span className="terminal__caret">▍</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="page" style={{ paddingTop: 8, paddingBottom: 64 }}>
        <div className="section-block">
          <div className="section-head">
            <h2 className="h2">Latest from the blog</h2>
            <button
              type="button"
              className="section-more"
              onClick={() => onNavigate("blog")}
            >
              View all →
            </button>
          </div>
          <div className="grid-2">
            {featuredPosts.map((post) => (
              <article key={post.title} className="card">
                <div className="tag-row" style={{ marginBottom: 10 }}>
                  {post.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="card-title" style={{ marginBottom: 8 }}>
                  {post.title}
                </div>
                <div className="card-excerpt">{post.excerpt}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="section-block">
          <div className="section-head">
            <h2 className="h2">Recent & upcoming talks</h2>
            <button
              type="button"
              className="section-more"
              onClick={() => onNavigate("talks")}
            >
              View All →
            </button>
          </div>
          <div className="talk-strip">
            <div style={{ maxWidth: "70ch" }}>
              <div className="talk-strip__meta">
                {topTalk.venue} · {topTalk.year}
              </div>
              <div className="talk-strip__title">{topTalk.title}</div>
              <div className="talk-strip__blurb">{topTalk.blurb}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-head">
            <h2 className="h2">Code samples & contributions</h2>
            <button
              type="button"
              className="section-more"
              onClick={() => onNavigate("code")}
            >
              View all →
            </button>
          </div>
          <div className="grid-2">
            {featuredProjects.map((proj) => (
              <a
                key={proj.name}
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="card"
              >
                <div className="proj-head">
                  <div className="proj-name proj-name--sm">{proj.name}</div>
                  <div className="proj-gh">
                    <GitHubIcon />
                    GitHub ↗
                  </div>
                </div>
                <div className="card-excerpt">{proj.oneLiner}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
