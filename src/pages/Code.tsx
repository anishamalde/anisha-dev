import { PROJECTS, VEGA_SAMPLES, type Project } from '../data';

const ROLE_LABEL: Record<NonNullable<Project['role']>, string> = {
  author: 'author',
  maintainer: 'maintainer',
  contributor: 'contribution',
};

export function Code() {
  return (
    <div className="page">
      <h1 className="h1">Code samples &amp; projects</h1>

      <p className="about-lead">
        I&rsquo;m the main maintainer of{" "}
        <a href="https://github.com/AmazonAppDev" target="_blank" rel="noreferrer">
          AmazonAppDev
        </a>
        , Amazon&rsquo;s public GitHub org for samples, starter templates, and
        agent skills for Fire TV, Vega OS, and Amazon Devices. I keep the samples
        current with each platform release, triage issues and PRs, and open-source
        new tooling for developers. The projects below are ones I look after or
        built.
      </p>

      <div className="vega-samples">
        <h2 className="about-h2">Vega sample apps</h2>
        <ul className="vega-samples__chips">
          {VEGA_SAMPLES.map((sample) => (
            <li key={sample.name}>
              <a
                href={sample.githubUrl}
                target="_blank"
                rel="noreferrer"
                title={sample.oneLiner}
              >
                {sample.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="about-h2">Personal projects</h2>
      <p className="code-note">
        Workshops, talk demos, and experiments, plus a couple of open-source
        contributions.
      </p>

      <div className="grid-2">
        {PROJECTS.map((proj) => (
          <div key={proj.name} className="card card--column">
            <div className="proj-head">
              <div className="proj-name">{proj.name}</div>
              {proj.role && (
                <span className={`role-badge role-badge--${proj.role}`}>
                  {ROLE_LABEL[proj.role]}
                </span>
              )}
            </div>
            <div className="card-excerpt" style={{ flex: 1 }}>
              {proj.oneLiner}
            </div>
            <div className="tag-row">
              {proj.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
            <div className="proj-footer">
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 700 }}
              >
                GitHub ↗
              </a>
              {proj.relatedLabel && (
                <span className="proj-related">{proj.relatedLabel}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
