import { EDUCATION, TIMELINE } from '../data';

export function About() {
  return (
    <div className="page page--narrower">
      <h1 className="h1">About</h1>
      <p className="about-lead">
        I&rsquo;m a Developer Advocate at Amazon Devices, based in London. I lead the DevRel
        delivery of <strong>Vega OS</strong> — Amazon&rsquo;s new operating system for Fire
        TV — and work across the React Native surface of Fire TV, Fire Tablet, and Vega.
      </p>
      <p className="about-lead">
        My job is to be a developer&rsquo;s best friend. That means writing sample code,
        shipping the tools I wish existed, giving talks, and closing the gap between what
        Amazon is building and what developers actually need to ship on it. I care about
        making the third app store a first-class choice, and about React Native genuinely
        scaling beyond the phone.
      </p>

      <h2 className="about-h2">What I focus on</h2>
      <ul className="about-list">
        <li>
          <strong>Vega OS delivery</strong> — DevRel for a brand-new OS: docs, starter
          templates, migration paths, and the developer story from &ldquo;hello world&rdquo;
          to a shipped app.
        </li>
        <li>
          <strong>React Native beyond the phone</strong> — TV, tablet, and multi-platform
          codebases. What actually shares, and where the platform-specific work lives.
        </li>
        <li>
          <strong>Open source &amp; sample code</strong> — the multi-tv-helloworld
          template, Agent Skills for Amazon Devices, and contributions to tools like
          react-native-testing-library.
        </li>
        <li>
          <strong>Talks &amp; writing</strong> — conferences, dev.to, and YouTube, with
          bias toward &ldquo;here&rsquo;s the honest trade-off&rdquo; over
          &ldquo;here&rsquo;s the happy path.&rdquo;
        </li>
      </ul>

      <h2 className="about-h2">Career</h2>
      <div className="timeline">
        {TIMELINE.map((step) => (
          <div key={step.year} className="timeline__row">
            <div className="timeline__year">{step.year}</div>
            <div>
              <div className="timeline__role">
                {step.role} · {step.org}
              </div>
              <div className="timeline__note">{step.note}</div>
            </div>
          </div>
        ))}
        {EDUCATION.map((step) => (
          <div key={step.year} className="timeline__row">
            <div className="timeline__year">{step.year}</div>
            <div>
              <div className="timeline__role">
                {step.qualification} · {step.org}
              </div>
              <div className="timeline__note">{step.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
