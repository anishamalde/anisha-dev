import { PROJECTS, type Project } from '../data';

const ROLE_LABEL: Record<NonNullable<Project['role']>, string> = {
  author: 'author',
  maintainer: 'maintainer',
  contributor: 'contribution',
};

export function Code() {
  return (
    <div className="page">
      <h1 className="h1">Code samples &amp; projects</h1>

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
